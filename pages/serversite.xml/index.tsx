import { getNews } from 'api/apiNews/newsApi';

import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const GetPost = async () => {
  const data = await getNews(999, 0, '');
  return data.data.data;
};

export const getServerSideProps: any = async (ctx) => {
  const siteUrl = 'https://GenshinViet.com';
  const news: any = await GetPost();

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
    loc: `${siteUrl}/news/${data.slug}`,
    lastmod: new Date().toISOString()
  }));

  const fields = fieldsNews.concat(fieldHome);

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {
  //console
}
