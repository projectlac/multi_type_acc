import Table from '@/components/Table/Table';
import { useAuth } from '@/contexts/AuthGuard';
import { ProtectGuess } from '@/contexts/ProtectGuess';
import { Box, Card, Container, styled, Typography } from '@mui/material';
import { getWebInformation } from 'api/auth';
import { getHistory } from 'api/user';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import BaseLayout from 'src/layouts/BaseLayout';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;

    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {
  const { update } = useAuth();
  const [data, setData] = useState([]);
  const [messsage, setNesssage] = useState({
    discord: ''
  });

  useEffect(() => {
    getHistory().then((res) => {
      setData(res.data.data);
    });
    getWebInformation().then((res) =>
      setNesssage({
        discord: res.data[0].discord
      })
    );
  }, [update]);
  return (
    <ProtectGuess>
      <OverviewWrapper>
        <Head>
          <title>Lịch sử mua hàng</title>
        </Head>

        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Box py={3}>
            <Box mb={3}>
              {messsage.discord.trim() && (
                <Marquee
                  style={{
                    background: 'rgb(75 75 75 / 78%)',
                    color: '#fff',
                    height: '40px',
                    fontSize: 16
                  }}
                >
                  <Box dangerouslySetInnerHTML={{ __html: messsage.discord }} />
                </Marquee>
              )}
            </Box>

            <Card
              sx={{
                mb: 3,
                px: 3,
                py: 2
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  a: {
                    color: '#33d'
                  }
                }}
              >
                {' '}
                <span
                  style={{
                    textAlign: 'center',
                    display: 'block',
                    color: 'red',
                    fontSize: '22px'
                  }}
                >
                  Thông báo
                </span>{' '}
                <br />
                Page genshinviet hiện đang lỗi, nếu bạn nhắn lâu quá shop không
                rep vui lòng nhắn tin cho chủ shop ấn{' '}
                <a href="https://m.me/122101845332012058/" target="__blank">
                  vào đây
                </a>
                <br />
                <br />
                <span
                  style={{
                    textAlign: 'center',
                    display: 'block',
                    fontSize: '17px'
                  }}
                >
                  {' '}
                  Các bạn lưu ý:
                </span>
                {`=> Shop cam kết không bán acc chết liên kết`}
                <br />
                {`=> Tất cả nick đều trắng thông tin hoặc có liên kết mail ib trang page shop đổi nhanh gọn `}{' '}
                <a href="https://m.me/122101845332012058/" target="__blank">
                  tại đây
                </a>
                <br />
                {`=> Shop không bán nick chết bất cứ 1 liên kết nào và không bán nick bị phá thánh di vật hoặc `}
                <br />
                Hỗ trợ nhanh chóng nhân viên rep nhanh tốc độ nhiệt tình ❤
              </Typography>
            </Card>
            <Card>
              <Table data={data} />
            </Card>
            <Card
              sx={{
                mt: 3,
                px: 3,
                py: 2
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'bold',
                  a: {
                    color: '#33d'
                  }
                }}
              >
                Nếu acc không có mail vui lòng liên kết mail và đổi mật khẩu
                ngay link đổi thông tin{' '}
                <a href="https://account.hoyoverse.com/#/login?cb_route=%2Faccount%2FsafetySettings">
                  Ấn vào đây
                </a>
                <br /> Nếu acc lỗi không vào được hoặc có mail ib qua trang page
                để được xử lý{' '}
                <a href="https://m.me/122101845332012058/" target={'__blank'}>
                  Ấn vào đây
                </a>
                <br /> Các bạn gặp bất cứ khó khăn gì về thông tin acc cứ ib qua
                page shop rep hỗ trợ ngay <br /> <br /> Sau 24h kể từ khi lúc
                mua acc shop không thể hỗ trợ các bạn được
              </Typography>
            </Card>
          </Box>
        </Container>
      </OverviewWrapper>
    </ProtectGuess>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
