import React, { FC, useEffect } from 'react';
import {StyledImage} from './Image.styles';

interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Image: FC<ImageProps> = ({src, alt, width, height, borderRadius}) => {

  useEffect(() => {
    console.log(`Image mounted`)
  }, [])

  return (
    <StyledImage width={width} height={height} borderRadius={borderRadius} className="StyledImage">
      <img src={src} alt={alt ?? ''} />
    </StyledImage>
  )
}

export default Image;
