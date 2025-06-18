import Head from "next/head";
import { ChainSelectionProvider } from "../context/ChainSelectionContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EmojiBlocks - EVM Block Visualizer</title>
        <meta
          name="description"
          content="See EVM blocks visualized in real-time with emojis representing transactions."
        />

        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta
          property="og:title"
          content="EmojiBlocks - EVM Block Visualizer"
        />
        <meta
          property="og:description"
          content="See EVM blocks visualized in real-time with emojis representing transactions."
        />
        <meta property="og:image" content="https://emojiblocks.com/hero.png" />
        <meta property="og:url" content="https://emojiblocks.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EmojiBlocks" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="EmojiBlocks - EVM Block Visualizer"
        />
        <meta
          name="twitter:description"
          content="See EVM blocks visualized in real-time with emojis representing transactions."
        />
        <meta name="twitter:image" content="https://emojiblocks.com/hero.png" />

        <link
          href="https://fonts.googleapis.com/css?family=Montserrat"
          rel="stylesheet"
        />
      </Head>
      <ChainSelectionProvider>
        <Component {...pageProps} />
      </ChainSelectionProvider>
    </>
  );
}
