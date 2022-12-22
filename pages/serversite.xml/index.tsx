import { queryAllAccountForSiteMap } from 'api/apiAccount/account';
import { queryAllProductForSiteMap } from 'api/product/productApi';

import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const GetPost = async () => {
  const data = await queryAllAccountForSiteMap();

  return data.data.data;
};
export const GetProduct = async () => {
  const data = await queryAllProductForSiteMap();

  return data.data.data;
};
export const getServerSideProps: any = async (ctx) => {
  const siteUrl = 'https://GenshinViet.com';
  const news: any = await GetPost();
  const product: any = await GetProduct();

  const fieldHome: ISitemapField[] = [
    {
      loc: `${siteUrl}/`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/404`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/topup`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/topup-genshin`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/account/vip`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/account/reroll`,
      lastmod: new Date().toISOString()
    },
    {
      loc: `${siteUrl}/account/random`,
      lastmod: new Date().toISOString()
    }
  ];

  const fieldsNews: ISitemapField[] = news?.map((data: any) => ({
    loc: `${siteUrl}/account/details/${data.slug}`,
    lastmod: new Date().toISOString()
  }));
  const productList: ISitemapField[] = product?.map((data: any) => ({
    loc: `${siteUrl}/shop/${data.slug}`,
    lastmod: new Date().toISOString()
  }));

  const fields = fieldsNews.concat(fieldHome);
  const raw = productList.concat(fields);
  return getServerSideSitemap(ctx, raw);
};

export default function Site() {
  //console
}
