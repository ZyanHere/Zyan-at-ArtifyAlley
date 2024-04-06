import "@styles/globals.css"

export const metadata = {
    title: "ArtifyAlley",
    description: "Discover and Share Artworks"
}

const layout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <main>
                {children}
            </main>
        </body>
    </html>
  )
}

export default layout
