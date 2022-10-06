import { Box, styled, Typography } from '@mui/material';
import Head from 'next/head';

// import MaintenanceImage from '../../styles/assets/images/404/maintain-icon-11.jpg';

const Error = styled(Box)(
  () => `    
    background: #ff8cfc;
    padding: 8px;`
);

const ErrorWrapper = styled(Box)(
  () => `
    position: relative;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 16px);
    overflow: hidden;
    border: 38px double orange;
    -o-border-image: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RUUzRTg3QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RUUzRTg4QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRFRTNFODVDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRFRTNFODZDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67RPKfAAAHHElEQVR42uxdWXPiOBBuG3MOQw4YNse8pLbmYf//j9nah615mRzDJDAhxNx4UVVrabps0GUgoK9KFWOILH1utb6WZDlIkgQOAH/l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) 38 round;
    border-image: url(data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RUUzRTg3QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RUUzRTg4QzU4QjExRTk5RDE4RTY1QzQwMjgxRkU1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRFRTNFODVDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRFRTNFODZDNThCMTFFOTlEMThFNjVDNDAyODFGRTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz67RPKfAAAHHElEQVR42uxdWXPiOBBuG3MOQw4YNse8pLbmYf//j9nah615mRzDJDAhxNx4UVVrabps0GUgoK9KFWOILH1utb6WZDlIkgQOAH/l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) 38 round;
    box-sizing: border-box;
    align-items: center;
    `
);

export default function Maintenance() {
  return (
    <>
      <Head>
        <title>Hệ thống đang bảo trì</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Error>
        <ErrorWrapper>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                textAlign: 'center'
              }}
            >
              <Typography
                color="#fff"
                sx={{
                  fontSize: {
                    md: 30,
                    xs: 20
                  },
                  fontWeight: 700,
                  fontFamily: 'Montserrat'
                }}
                my={2}
              >
                Hệ thống đang bảo trì <br />
                Vui lòng quay lại sau
              </Typography>
              {/* <Image
                alt=""
                width={32}
                height={32}
                src="data:image/png;base64,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UmVhZHlxyWU8AAADIWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE2NzM1Q0ZEQzU4QzExRTlCRUU3Qzc4MkFGMDg4NkZDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjE2NzM1Q0ZFQzU4QzExRTlCRUU3Qzc4MkFGMDg4NkZDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTY3MzVDRkJDNThDMTFFOUJFRTdDNzgyQUYwODg2RkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTY3MzVDRkNDNThDMTFFOUJFRTdDNzgyQUYwODg2RkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4pXB0oAAAEyElEQVR42uRbaWxMURS+rW7WTIgWiWoikSA0BEGCVKvxQ0ipJX5QgvSPNZSIP4TEGsEfGinhj6VSCT9RNNbW0oqisVTTNKWIpekyZcY5mU+8TGbeu/e9mXkzb07yJfPuPfe8+827555zz5tJKNm5T9gk6QQvoc2OmycK+2QsIOKN+GjCGLtunmQj8Wwb720b8T6E8fBx/twRL0t9EiGZkEKYGE8+PiPIZ0cTZ/fK0Vzn2uFydhCfSnBprl1oczzxBQHa5jmd+BDCzADtOehzLPGlhF4B2nuhz5HEBxIKdfoLoeM44msIvXX6e0PHUcRHEAok9Fgn0ynEEwi7kKkZSTJ0E5xAnH13goI+p7ALY534KMJGE+M2Y2xMEu9HOEBIC9L/mdAapI/H7IeNmCLOvnqIMFxH5wXhmU5/JmwkxwpxtrmHMNlA7z6h2kCHbewOxzxDbTAFy3uOgV434RahEp/1JB/LPiVaibM/Hvc7cgaTm4RfwE0J/dmw3TfaiPMOfE74KitG8ptQprkuQ5uRsO3zodrtrRLnRGMx4axCxnWB0Ki5bkSbjGTiiyq0muRYIc5paClhu4L/1RNOBmjntteSNjjU7SCcwhwiRnwQoQRPSSUj+0TYSugK0MdtW6CjkuHxHLaZOdWpEB9K2ESoICxRjK+vCEVIWoROQrMKuir5Ap/jrxI2EAbLDkyS6J8ifOWiHBMrxEMoJ5wgdEroM/l1ILFI4X5cm19BWI4weZ3wWG/TTApihJcwl4i4Auoy4Q6/EaZ4I3qnOLYTucAVwmqEsiSFB5kPfMcc7iJD7PBX5OXB77D4BR6/3cg2mSZy3v0UuI0bW5G3hJ344nPwMNivZWtzLqwaRg+hllBHeMmbbKJmSXoQIrwWNspUizYCiRc2Uy1EoX/z+QOeXn7ibUCVJu3kHHkWIY8wQNJ4OlwjFyHuBpb6e5OTHYmlbvaFww8sdV59NQS3kY+zwj3gIGEaYT6+iEQFX5sLX1PZ3Fi49rYeSYqZzZSJXiM8UN3c/DepKmAYQsdCoV809F/+HPrGIU63SayaI8L37lxFOhBmLxJaQh3H2eBR4SsIXsKGISujkdamG5A+o0i6B3MpwNxaVDYkVfkCF+CY+VxhXAbhcJCKTBqedIaCPb73MszlayRz9Q9INg76bxw6wmGzOEB7scKTdiPOryV8tOt05sFS43S0SXIMP6UszXUW2mSkCfe6bDVkhuo83kBYSXgiueMXaa5XS4arGqSlDdFWgfmFMFQpoZuHik1/xGkjqUT+3h6tNTc3kpe7EmfqXKSiqQa6d2DTHcqJhqPK6kGhwKiCOl2iVFUNW55QTzJcdXU3CgTNOjrjhP4vnpphoyccEwznm5R2LNFunYQl2EmrC1We9nBNLtzvzt4QjpkYdyxUu7ddxAVirkqG9wwHGxHrxDnR2Cvkauc90PU6gThLo/AVBI2kwkoaGo3EWUoNzuTcdzpSk4kk8W8GvlsOHccRFygUBEpG/qBPOJV4q/hf29PKbRH81xGOIP5vA/OXa5GehB3EHxF+aq65/v4wHohzrNb+GOCWZIyPeeLCz8+r7JiAXX/GqcFT5gztSTwR5zp4HYh3xBNxltpI5OTRSLw+Xom/tJP4XwEGAEKg+ZcIzINPAAAAAElFTkSuQmCC"
                className="error__star"
              ></Image> */}
              {/* <Typography
                color="#888"
                sx={{
                  fontSize: {
                    md: 20,
                    xs: 13
                  },
                  fontFamily: 'Montserrat'
                }}
                lineHeight={2}
              >
                Mọi giao dịch chuyển tiền sẽ vẫn tiếp tục hoạt động sau hệ thống
                bảo trì.
                <br />
                Nếu có vấn đề ngoài ý muốn, vui lòng liên hệ admin để được hỗ
                trợ!
              </Typography> */}
              <Box mt={3}></Box>
            </Box>
          </Box>
        </ErrorWrapper>
      </Error>
    </>
  );
}
