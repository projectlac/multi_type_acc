import OgTag from '@/components/Common/OgTag';
import PaginationPage from '@/components/Common/PaginationPage';
import TitleSpecial from '@/components/Common/TitleSpecial';
import NewsItem from '@/components/NewsItem/NewsItem';
import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container, Grid } from '@mui/material';
import { getNews } from 'api/apiNews/newsApi';
import { INews } from 'model/news';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';


function NewsIndex() {
    const router = useRouter();
    const { page: pageHistory } = router.query;
    const [data, setData] = useState<INews[]>([]);
    const [total, setTotal] = useState<number>(0);



    useEffect(() => {
        let tempPage = pageHistory ? (+pageHistory - 1) * 9 : 0;
        executeScroll();
        const param = {
            limit: 9,
            offset: tempPage,
            search: ''
        };

        getNews(param.limit, param.offset, param.search).then((res) => {
            setData(res.data.data);
            setTotal(res.data.total);
        });
    }, [pageHistory]);

    const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(event.type);
        router.push(`/news?page=${value}`);
    };

    const executeScroll = () => {
        const id = 'scrollTo';
        const yOffset = -95;
        const element = document.getElementById(id);
        const y = element?.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <Box>
            <Head>
                <title>Thông tin Shop</title>
                <OgTag title="Thông tin Shop" />
            </Head>

            <Container maxWidth="lg" sx={{ mt: 15 }}>
                <TitleSpecial>Thông tin Shop</TitleSpecial>
                <Box py={3}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={12} id="scrollTo">
                            <Grid container columnSpacing={1.7} rowSpacing={2}>
                                {data.map((d, i) => {
                                    return (
                                        <Grid
                                            item
                                            xs={12}
                                            md={4}
                                            sm={6}
                                            key={i}
                                            sx={{
                                                display: 'flex'
                                            }}
                                        >
                                            <NewsItem data={d} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            {total > 9 && (
                                <PaginationPage
                                    numberOfPage={Math.ceil(total / 9)}
                                    onChange={handlePage}
                                    index={+pageHistory}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default NewsIndex;
NewsIndex.getLayout = function getLayout(page: ReactElement) {
    return <BaseLayout>{page}</BaseLayout>;
};
