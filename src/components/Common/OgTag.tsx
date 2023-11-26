import React from 'react';
import img from 'src/assets/images/change/BANNER.jpg';
import imgFavicon from '/public/static/favicon_io/favicon.ico';
interface IOG {
  title: string;
  description?: string;
}
function OgTag({ title, description }: IOG) {
  return (
    <>
      <link rel="shortcut icon" href={imgFavicon} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={
          description ? description : `Genshinviet.com uy tín hàng đầu Việt Nam`
        }
      />
      <meta
        name="description"
        key="desc"
        content={
          description ? description : `Genshinviet.com uy tín hàng đầu Việt Nam`
        }
      />

      <meta property="og:locale" content="vi_GB" />
      <meta property="og:locale:alternate" content="vi-VN" />
      <meta
        name="google-site-verification"
        content="qy7s9Icea_TQczIdquJ0c88UxCIPd2pLpEaT4iK0hJc"
      />
      <meta property="og:image" content={img} />
      <meta property="og:image:secure_url" content={img} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="400" />
      <meta property="og:image:height" content="300" />
      <meta
        property="og:image:alt"
        content={`Genshinviet.com uy tín hàng đầu Việt Nam`}
      />
    </>
  );
}

export default OgTag;
