import localFont from 'next/font/local'

const myFont = localFont({
  src: '../../../../../public/fonts/kt.ttf',
  display: 'block'
})

export default function Poetry({ poem, children }: {children: React.ReactNode, poem: { title: string, dynasty: string, writer: string, content: string } }) {
  return (
    <div className={`${myFont.className} flex flex-col antialiased`}>
      <h2 className="text-3xl font-[500]">{poem.title}</h2>
      <p className="text-2xl mt-4 mb-4">{poem.writer}（{poem.dynasty}）</p>
      <p className="text-xl leading-loose tracking-wider poetry-p">{children}</p>
    </div>
  )
}
