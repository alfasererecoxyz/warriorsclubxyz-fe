export namespace BackgroundText {
  type SVGProps = { text: string } & React.JSX.IntrinsicElements['svg']
  
  export function Text({text, ...rest}: Omit<SVGProps, 'viewBox' | 'xmlns'>) {
    return (
      <svg {...rest} viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'DrukWide';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(/DrukTextWide.woff2) format('woff2');
                // src: url(https://fonts.gstatic.com/s/quantico/v17/rax5HiSdp9cPL3KIF7TQAShdu0_y8zac.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
              .font {
                font: 11px 'DrukWide';
                font-weight: 700;
              }
            `}}
        />
        <text x="0" y="16" className="font" fill="#AE0000">{text}</text>
      </svg>
    )
  }
}