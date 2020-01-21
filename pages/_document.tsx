import Document, { Head, Html, Main, NextScript } from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  // const sheet = new ServerStyleSheet()
  // const originalRenderPage = ctx.renderPage

  // try {
  //   ctx.renderPage = () =>
  //     originalRenderPage({
  //       enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
  //     })

  //   const initialProps = await Document.getInitialProps(ctx)

  //   return {
  //     ...initialProps,
  //     styles: (
  //       <>
  //         {initialProps.styles}
  //         {sheet.getStyleElement()}
  //       </>
  //     ),
  //   }
  // } finally {
  //   sheet.seal()
  // }
  // }

  render() {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link
            href='https://fonts.googleapis.com/css?family=Barlow:400,700'
            rel='stylesheet'
          />
          <link href='../public/Barlow-Regular.woff2' rel='font/woff2' />
          <link href='./public/Barlow-Regular.woff2' rel='font/woff2' />
          <link href='/public/Barlow-Regular.woff2' rel='font/woff2' />
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'Barlow';
                  font-weight: 300;
                  src: url('/static/Barlow-Regular.woff2') format('woff2');
                }
              `,
            }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
