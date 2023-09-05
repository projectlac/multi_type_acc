import TitleWeb from '@/components/Common/TitleWeb';
import ReputationItem from '@/components/Reputation/Reputation';

import BaseLayout from '@/layouts/BaseLayout';
import { Box, Container } from '@mui/material';

function Reputation() {
  return (
    <Container maxWidth="lg" sx={{ mt: 20, mb: 10 }}>
      <Box
        pt={3}
        pb={2}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="center"
      >
        <TitleWeb mt={2} fontSize={15}>
          Check uy tín
        </TitleWeb>
      </Box>
      <Box>
        <ReputationItem></ReputationItem>
      </Box>
    </Container>
  );
}
Reputation.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
export default Reputation;
