import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';

function parseCueTimestamp(rawTime: string): number {
  // CUE INDEX timestamps are MM:SS:FF (minutes:seconds:frames), 75 frames/sec
  const match = rawTime.trim().match(/^(\d{1,3}):(\d{2}):(\d{2})$/);
  if (!match) return -1;

  const [, minutesStr, secondsStr, framesStr] = match;
  const minutes = Number(minutesStr);
  const seconds = Number(secondsStr);
  const frames = Number(framesStr);

  if (seconds > 59 || frames > 74) return -1;

  const totalMs =
    minutes * 60 * 1000 +
    seconds * 1000 +
    Math.round((frames / 75) * 1000);

  return totalMs;
}

function convertCueToFfmpegChapters(cueContent: string): string {
  const lines = cueContent.split(/\r?\n/);
  const tracks: Array<{ title: string; timeMs: number }> = [];

  let currentTitle = 'Untitled';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const titleMatch = trimmed.match(/^TITLE\s+"?([^"]+)"?$/i);
    if (titleMatch) {
      currentTitle = titleMatch[1].trim();
      continue;
    }

    const indexMatch = trimmed.match(/^INDEX\s+01\s+(.+)$/i);
    if (indexMatch) {
      const ts = parseCueTimestamp(indexMatch[1]);
      if (ts >= 0) {
        tracks.push({ title: currentTitle, timeMs: ts });
        currentTitle = 'Untitled';
      }
    }
  }

  let output = ';FFMETADATA1\n';

  for (let i = 0; i < tracks.length; i++) {
    const start = tracks[i].timeMs;
    const end = i < tracks.length - 1 ? tracks[i + 1].timeMs : start + 3600000;
    output += `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${start}\nEND=${end}\nTITLE=${tracks[i].title}\n`;
  }

  return output;
}

export function handleCueConversion(cueInputValue: string): string {
  if (!cueInputValue.trim()) return '';
  return convertCueToFfmpegChapters(cueInputValue);
}

function CueUtil() {
  const [cueText, setCueText] = useState('');
  const [convertedCue, setConvertedCue] = useState('No Conversion Yet');

  const onButtonClick = () => {
    setConvertedCue(handleCueConversion(cueText));
  };

  return (
    <>
      <header>
        Convert .cue files for use with FFMPEG
        Copy the contents of the .cue file into the box, then press the button. Copy the generated text into a blank .txt file and use with FFMPEG
      </header>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '40ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          id="cueIn"
          label="Paste cue here"
          variant="outlined"
          multiline
          minRows={12}
          fullWidth
          value={cueText}
          onChange={(event) => setCueText(event.target.value)}
        />
        <div>
          <Button id="submit" type="button" onClick={onButtonClick} variant="outlined">Convert</Button>
          <Button id="download" type="button" onClick={onButtonClick} variant='outlined'>Download</Button> {/**TODO */}
        </div>
      </Box>
      <div style={{ whiteSpace: 'pre-wrap' }}>{convertedCue}</div>
      <header><br></br>Useful FFMPEG commands</header>
      <div>
        Add the chapters specified to the book.
        <code>ffmpeg -i Book.mp3 -i Chapters.txt -map 0:a -map_metadata 1 -c:a aac -b:a 128k output.m4b</code>
      </div>
      <div>
        Add metadata and copy
        <code>ffmpeg -i input.m4b -c copy -metadata title="Book Title" -metadata artist="Author Name" -metadata album="Series Name" -metadata genre="Audiobook" output.m4b</code>
      </div>
      <div>
        add jpg cover image and copy
        <code>ffmpeg -i Book.m4b -i Cover.jpg -map 0:a -map 1:v -c copy -disposition:v attached_pic -metadata:s:v title="Book cover" output.m4b</code>
      </div>
      <div>
        List all mp3 filenames in the current folder in files.txt
        <code>for f in *.mp3; do echo "file '$f'"; done {'>'} /tmp/files.txt && mv /tmp/files.txt files.txt</code>
      </div>
      <div>
        files.txt lists all the mp3s in order, chapters.txt is the chapters metadata
        <code>ffmpeg -f concat -safe 0 -i files.txt -i chapters.txt -map 0:a -map_metadata 1 -c:a aac -b:a 128k Audiobook.m4b</code>
      </div>
    </>
  );
}

export default CueUtil;