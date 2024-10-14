import { useEffect } from 'react';
import {StyledImage} from './Image.styles';
const Image = ({src, alt, width, height, borderRadius}) => {

  useEffect(() => {
    console.log(`Image mounted`)
  }, [])

  return (
    <StyledImage width={width} height={height} borderRadius={borderRadius} className="StyledImage">
      <img src={src} alt={alt ? alt : ''} />
    </StyledImage>
  )
}

export default Image;
