import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/News/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';
import NewsTableSetup from '@/content/Management/News/NewsTableSetup';

function News() {
    return (
        <>
            <Head>
                <title>Tin tức</title>
            </Head>
            <PageTitleWrapper>
                <PageHeader />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <NewsTableSetup />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

News.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default News;
