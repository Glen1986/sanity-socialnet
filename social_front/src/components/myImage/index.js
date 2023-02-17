import Image from 'next/image'

const MyImage = ({ src, width, quality }) => {
  return (
    <Image
      // loader={myLoader}
      src={src}
      alt="Picture of the author"
      width={width}
      height={height}
      quality={quality}
    />
  )
}
 export default MyImage;
