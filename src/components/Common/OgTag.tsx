import React from 'react';
import img from 'src/assets/images/310223374_1734544413588410_4745229975174853381_n.jpg';
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
            : `Shop Genshin, Honkai Star Rail Của Người Việt Uy Tín Giá Rẻ Nhất Thị Trường Việt Nam. 
            Acc Genshin Trắng Thông Tin,Cam Kết Bảo Hành Acc Trọn Đời. shop acc genshin, acc genshin uy tín,acc genshin, định giá acc genshin`
        }
      />
      <meta
        name="description"
        key="desc"
        content={
          description
            ? description
            : `Shop Genshin, Honkai Star Rail Của Người Việt Uy Tín Giá Rẻ Nhất Thị Trường Việt Nam. 
            Acc Genshin Trắng Thông Tin,Cam Kết Bảo Hành Acc Trọn Đời. shop acc genshin, acc genshin uy tín,acc genshin, định giá acc genshin`
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
        content={`Shop Genshin, Honkai Star Rail Của Người Việt Uy Tín Giá Rẻ Nhất Thị Trường Việt Nam. 
            Acc Genshin Trắng Thông Tin,Cam Kết Bảo Hành Acc Trọn Đời. shop acc genshin, acc genshin uy tín,acc genshin, định giá acc genshin`}
      />
    </>
  );
}

export default OgTag;
