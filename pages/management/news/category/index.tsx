import PageTitleWrapper from '@/components/PageTitleWrapper';
import PageHeader from '@/content/Management/NewsCategory/PageHeader';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import Head from 'next/head';

import NewCategorySetup from '@/content/Management/NewsCategory/NewCategorySetup';

function NewsCategory() {
    return (
        <>
            <Head>
                <title>Danh mục Tin tức</title>
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
                        <NewCategorySetup />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

NewsCategory.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default NewsCategory;
