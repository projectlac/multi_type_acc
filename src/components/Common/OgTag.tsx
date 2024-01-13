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
          description
            ? description
            : `Mua bán Shop Acc Genshin Impact giá rẻ, uy tín. Mua bán nick Honkai Star Rail đảm bảo an toàn, tự động 100%`
        }
      />
      <meta
        name="description"
        key="desc"
        content={
          description
            ? description
            : `Mua bán Shop Acc Genshin Impact giá rẻ, uy tín. Mua bán nick Honkai Star Rail đảm bảo an toàn, tự động 100%`
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
        content={`Shop Acc Genshin Impact - Honkai Star Rail giá rẻ, uy tín nhất`}
      />
    </>
  );
}

export default OgTag;
