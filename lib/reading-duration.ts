// default
const wordsPerMinute = 225;

export function readingTimeEstimation(text: string) {
  return Math.ceil(wordCounter(text) / wordsPerMinute);
}

function wordCounter(input: string) {
  const text = input.split(/\s+/);
  let wordCount = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " " && isWord(text[i])) {
      wordCount++;
    }
  }
  return wordCount;
}

function isWord(str: string) {
  let alphaNumericFound = false;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (
      (code > 47 && code < 58) || // numeric (0-9)
      (code > 64 && code < 91) || // upper alpha (A-Z)
      (code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      alphaNumericFound = true;
      return alphaNumericFound;
    }
  }
  return alphaNumericFound;
}

// enhance
interface ReadingOptions {
  wordsPerMinute?: number;
  emoji?: boolean | string;
}
interface Emojis {
  [index: string]: string;
}

const emojis: Emojis = {
  hourglass_done: "⌛ ",
  hourglass_not_done: "⏳ ",
  stopwatch: "⏱ ",
  clock: "🕒 ",
  watch: "⌚ ",
  timer: "⏲ ",
  alarm: "⏰ ",
  books: "📚 ",
  open_book: "📖 ",
  closed_book: "📕 ",
  blue_book: "📘 ",
  green_book: "📗 ",
  orange_book: "📙 ",
  notebook: "📓 ",
  notebook_alt: "📔 ",
};
export default function readingDuration(
  htmlContent: string,
  options: ReadingOptions = {},
  onlyNumber: boolean
): string | number {
  const { wordsPerMinute = 225, emoji = true } = options;

  // Remove HTML tags (e.g., if text was converted from Markdown)
  const plainText = htmlContent
    // Remove <code> elements
    .replace(/<code>.*?<\/code>/gs, "")
    // Remove code blocks in Markdown (e.g., ```js ... ```)
    .replace(/```[^`]+```/gs, "")
    // Remove other HTML tags
    .replace(/<[^>]*>/g, "");

  const words = plainText.split(/\s+/).length;

  /*!
   *  Assuming an average reader reads around 200-230 words per minute,
   *  research can be found here: https://scholarwithin.com/average-reading-speed
   */
  const minutes = words / wordsPerMinute;

  // Round up to the nearest minute
  const readingTime = Math.ceil(minutes);

  const emojiChoice =
    typeof emoji === "string" ? emojis[emoji] : emoji ? "⌛ " : "";

  if (onlyNumber) {
    return readingTime;
  }
  return `${emojiChoice}${readingTime} min read`;
}
