import { useRouter } from 'next/router';
import { useContext } from 'react';

import {
  alpha,
  Box,
  Button,
  List,
  ListItem,
  ListSubheader,
  styled
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';

import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { useAuth } from '@/contexts/AuthGuard';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { user } = useAuth();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={currentRoute === '="/' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<DesignServicesTwoToneIcon />}
                  >
                    Overview
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Dashboards
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/dashboards/crypto" passHref>
                  <Button
                    className={
                      currentRoute === '/dashboards/crypto' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<BrightnessLowTwoToneIcon />}
                  >
                    Thống kê
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {user && user?.role === 'ADMIN' && (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                User
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href="/management/users" passHref>
                    <Button
                      className={
                        currentRoute === '/management/users' ? 'active' : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<TableChartTwoToneIcon />}
                    >
                      Quản lý User
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/management/payment-history" passHref>
                    <Button
                      className={
                        currentRoute === '/management/payment-history'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<TableChartTwoToneIcon />}
                    >
                      Lịch sử nạp
                    </Button>
                  </NextLink>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </List>
        )}

        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Genshin Impact
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/management/transactions" passHref>
                  <Button
                    className={
                      currentRoute === '/management/transactions'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản VIP
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/management/new-account" passHref>
                  <Button
                    className={
                      currentRoute === '/management/new-account' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản khởi đầu
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/management/nomal-account" passHref>
                  <Button
                    className={
                      currentRoute === '/management/nomal-account'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản thường
                  </Button>
                </NextLink>
              </ListItem>
              {user && user?.role === 'ADMIN' && (
                <ListItem component="div">
                  <NextLink href="/management/topup-genshin" passHref>
                    <Button
                      className={
                        currentRoute === '/management/topup-genshin'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<TableChartTwoToneIcon />}
                    >
                      Quản lý nạp
                    </Button>
                  </NextLink>
                </ListItem>
              )}
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Honkai Star Rail
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/management/honkai-star-rail/vip" passHref>
                  <Button
                    className={
                      currentRoute === '/management/honkai-star-rail/vip'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản VIP
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/management/honkai-star-rail/new" passHref>
                  <Button
                    className={
                      currentRoute === '/management/honkai-star-rail/new'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản khởi đầu
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink
                  href="/management/honkai-star-rail/reroll-random"
                  passHref
                >
                  <Button
                    className={
                      currentRoute ===
                      '/management/honkai-star-rail/reroll-random'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<TableChartTwoToneIcon />}
                  >
                    Tài khoản thường
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {user && user?.role === 'ADMIN_PRODUCT' && (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Shop
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href="/management/shop/category" passHref>
                    <Button
                      className={
                        currentRoute === '/management/shop/category'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Danh mục sản phẩm
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/management/shop/product" passHref>
                    <Button
                      className={
                        currentRoute === '/management/shop/product'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Danh sách sản phẩm
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/management/shop/order" passHref>
                    <Button
                      className={
                        currentRoute === '/management/shop/order'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Quản lý đơn hàng
                    </Button>
                  </NextLink>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </List>
        )}
        {user && user?.role === 'ADMIN_PRODUCT' && (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Vòng quay may mắn
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href="/management/lucky-spin" passHref>
                    <Button
                      className={
                        currentRoute === '/management/lucky-spin'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Quản lý
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/management/lucky-spin/history" passHref>
                    <Button
                      className={
                        currentRoute === '/management/lucky-spin/history'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Lịch sử
                    </Button>
                  </NextLink>
                </ListItem>
                <ListItem component="div">
                  <NextLink href="/management/lucky-spin/order" passHref>
                    <Button
                      className={
                        currentRoute === '/management/lucky-spin/order'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<BrightnessLowTwoToneIcon />}
                    >
                      Đơn
                    </Button>
                  </NextLink>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </List>
        )}
        {user && user?.role === 'ADMIN' && (
          <>
            <List
              component="div"
              subheader={
                <ListSubheader component="div" disableSticky>
                  Thuộc tính
                </ListSubheader>
              }
            >
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <NextLink href="/management/tag" passHref>
                      <Button
                        className={
                          currentRoute === '/management/tag' ? 'active' : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<BallotTwoToneIcon />}
                      >
                        VK - NV - GI
                      </Button>
                    </NextLink>
                  </ListItem>
                  <ListItem component="div">
                    <NextLink href="/management/tag-hsr" passHref>
                      <Button
                        className={
                          currentRoute === '/management/tag-hsr' ? 'active' : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<BallotTwoToneIcon />}
                      >
                        VK - NV - HSR
                      </Button>
                    </NextLink>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </List>
            <List
              component="div"
              subheader={
                <ListSubheader component="div" disableSticky>
                  Content
                </ListSubheader>
              }
            >
              <SubMenuWrapper>
                <List component="div">
                  <ListItem component="div">
                    <NextLink href="/management/content" passHref>
                      <Button
                        className={
                          currentRoute === '/management/content' ? 'active' : ''
                        }
                        disableRipple
                        component="a"
                        onClick={closeSidebar}
                        startIcon={<BallotTwoToneIcon />}
                      >
                        Quản lý nội dung
                      </Button>
                    </NextLink>
                  </ListItem>
                </List>
              </SubMenuWrapper>
            </List>
          </>
        )}
        {/* <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Extra Pages
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/status/404" passHref>
                  <Button
                    className={currentRoute === '/status/404' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<CheckBoxTwoToneIcon />}
                  >
                    Error 404
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/500" passHref>
                  <Button
                    className={currentRoute === '/status/500' ? 'active' : ''}
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<CameraFrontTwoToneIcon />}
                  >
                    Error 500
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/coming-soon" passHref>
                  <Button
                    className={
                      currentRoute === '/status/coming-soon' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<ChromeReaderModeTwoToneIcon />}
                  >
                    Coming Soon
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/status/maintenance" passHref>
                  <Button
                    className={
                      currentRoute === '/status/maintenance' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<WorkspacePremiumTwoToneIcon />}
                  >
                    Maintenance
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> */}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
