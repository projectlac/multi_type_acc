import { Box, Typography } from '@mui/material';
export default function ReputationItem() {
  return (
    <Box>
      <Box
        sx={{
          background: '#fff',
          padding: '15px',
          mb: 3,
          borderRadius: '10px'
        }}
      >
        {' '}
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#d33',
            fontSize: '19px',
            textAlign: 'center'
          }}
        >
          Nếu các bạn đang quan tâm về uy tín của shop thì hãy xem video này
        </Typography>
        <Box
          sx={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            mb: 2
          }}
          width={'100%'}
        >
          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Cl3Of_L3ndI?si=Opql7jJ5htD40xcZ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe> */}
          <iframe
            src="https://drive.google.com/file/d/1hfepoovMOyd9uEILF2HCwstQvliA_Wf4/preview"
            width="560"
            frameBorder="0"
            height="315"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </Box>
        <Typography
          sx={{
            fontWeight: 'bold',
            color: '#d33',
            fontSize: '19px',
            textAlign: 'center'
          }}
        >
          Bài viết này sẽ trả lời tất cả các câu hỏi cho các bạn <br /> lần đầu
          đến shop cũng như lần đầu mua acc tại shop Genshinviet.com
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            textAlign: 'left',
            '& span': {
              color: '#d33'
            }
          }}
        >
          <hr /> <br />
          <span>Thứ 1 shop bán nick có thay đổi thông tin được không ?</span>
          <br /> - Shop cam kết 100% với các bạn tất cả nick trên shop đều trắng
          thông tin và không chết 1 liên kết nào Từ khâu chọn nick shop mình rất
          cẩn thận cam kết với các bạn nick không bị phá nhựa , thánh di vật ,
          phá vũ khí (nếu có shop sẽ hoàn tiền ngay)
          <br />
          <br />
          <span> Thứ 2 shop có uy tín không ? </span>
          <br />- Nếu các bạn từng xem stream hoặc youtube và tiktok chắc chắn
          sẽ thấy shop mình được rất nhiều kênh tin tưởng đồng hành cùng ( mình
          không tiện show các kênh đó ra nhưng các bạn cần biết cứ ib cho page
          hoặc cho chủ shop )
          <a href="https://facebook.com/nguyenhung208" target="__blank">
            {' '}
            tại đây
          </a>
          . Nếu không uy tín thì chắc chắn không được nhiều youtuber và tiktoker
          làm cùng shop trong 1 khoảng thời gian rất dài như vậy
          <br /> <br />
          <span>Thứ 3 tại sao nick ở shop rẻ vậy ,có đảm bảo không ?</span>
          <br />- Vì shop mình bán không qua trung gian nên không thêm 1 phí nào
          mới có giá rẻ vậy và bảo hành 100% khi các bạn mua ở shop kể cả nick
          trắng thông tin Shop mình bán cho các bạn bảo hành từ a-z bảo hành
          back acc,ban acc,mất acc,… Tất cả đều được shop mình bảo hành 100% các
          bạn yên tâm mua ở shop GenshinViet.com Nếu nick có vấn đề chắc chắn
          mình không bao giờ dám bảo hành cho khách khi mua và cũng không thể
          làm từ khi game mới ra đến hiện tại
          <br /> <br />
          <span>
            Thứ 4 bên shop nhiều acc tool vậy có sao không? ( dành cho các bạn
            đã mua nick rất nhiều )
          </span>
          <br />- Shop cam kết 100% acc bên shop có tool nhưng không bị ban nếu
          có mình vẫn đền bình thường Và mình bán từ game mới ra đến giờ nguồn
          bên mình rất sạch bảo đảm không bị ban + back acc Mình cũng khẳng định
          mình bán từ game mới ra chưa có nick tool nào bên shop bị back hoặc bị
          ban
          <br />
          <br />
          Và cuối cùng shop mình tự tin với việc hỗ trợ khách hàng cực nhanh của
          shop mình nếu bạn nào từng mua nick ở shop sẽ biết tốc độ rep và hỗ
          trợ của shop không đến 2p các bạn đã có nick chơi page hỗ trợ ấn{' '}
          <a href="https://www.facebook.com/nguyenhung208/" target="__blank">
            vào đây
          </a>
          . <br />
          <br /> Cảm ơn các bạn đã luôn ủng hộ shop GenshinViet.com trong thời
          gian qua ❤
        </Typography>
      </Box>
    </Box>
  );
}
