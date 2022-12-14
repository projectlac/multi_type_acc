import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { getHero, getWeapon } from 'api/apiTag/tagApi';

import React, { useEffect, useState } from 'react';
interface IFilm {
  desc: string;
  slug: string;
}
interface IProps {
  handleFilter: (data: any) => void;
  toggleOpen: () => void;
}
function FilterVip({ handleFilter, toggleOpen }: IProps) {
  const [sort, setSort] = useState('false');
  const [ar, setAr] = useState('');
  const [code, setCode] = useState('');
  const [server, setServer] = useState('ASIA');
  const [rangeMoney, setRangeMoney] = useState('');
  const [inputValueHero, setInputValueHero] = useState<IFilm[]>([]);
  const [inputValueWeapon, setInputValueWeapon] = useState<IFilm[]>([]);
  const [optionHero, setOptionHero] = useState([]);
  const [optionWeapon, setOptionWeapon] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      let tempOptionHero = [];
      let tempOptionWeapon = [];

      await getWeapon(999).then((res) => {
        setOptionWeapon(res.data.data);
        tempOptionWeapon = res.data.data;
      });
      await getHero(999).then((res) => {
        setOptionHero(res.data.data);
        tempOptionHero = res.data.data;
      });

      var retrievedObject = localStorage.getItem('filter');
      let filter = JSON.parse(retrievedObject);

      filter?.server && setServer(filter.server);
      filter?.ar && setAr(filter.ar);
      filter?.priceSort && setSort(filter.priceSort);
      filter?.keyword && setCode(filter.keyword);
      filter?.rangeMoney && setRangeMoney(filter.rangeMoney);

      const initHero = filter?.hero && filter.hero.split(',');
      const tempHero =
        initHero &&
        initHero.map((d) => tempOptionHero.filter((f) => f.slug === d)[0]);
      const initWeapon = filter?.weapon && filter.weapon.split(',');

      const tempWeapon =
        initWeapon &&
        initWeapon.map((d) => tempOptionWeapon.filter((f) => f.slug === d)[0]);
      tempHero && setInputValueHero(tempHero);

      tempWeapon && setInputValueWeapon(tempWeapon);
    };
    callApi();
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'ar') {
      setAr(e.target.value);
    } else {
      setCode(e.target.value);
    }
  };
  const handleChange = (event) => {
    setRangeMoney(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleChangeServer = (event) => {
    setServer(event.target.value);
  };

  const submit = () => {
    var isTrueSet = sort === 'true';

    let data = {
      ar: ar,
      server: server,
      rangeMoney: rangeMoney,
      hero: inputValueHero && inputValueHero.map((d) => d.slug).toString(),
      weapon:
        inputValueWeapon && inputValueWeapon.map((d) => d.slug).toString(),
      priceSort: isTrueSet,
      keyword: code
    };
    handleFilter(data);
    toggleOpen();
  };
  return (
    <Card
      sx={{
        background:
          'linear-gradient(90deg, rgba(228,214,200,1) 0%, rgba(239,231,225,1) 50%, rgba(228,214,200,1) 100%)',
        padding: '15px',
        borderRadius: '5px',
        transition: 'all 0.5s'
      }}
    >
      <Typography
        textAlign={'center'}
        fontWeight={'bold'}
        fontSize={18}
        textTransform="uppercase"
      >
        T??m ki???m
      </Typography>
      <Divider sx={{ mt: 1, mb: 3 }}></Divider>

      <Grid container columnSpacing={1.3} rowSpacing={2.5}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={optionHero}
            value={inputValueHero}
            onChange={(event: any, newValue: any) => {
              console.log(event.type);

              setInputValueHero(newValue);
            }}
            getOptionLabel={(option: IFilm) => option?.desc}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="T??m theo nh??n v???t"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={optionWeapon}
            getOptionLabel={(option: IFilm) => option?.desc}
            value={inputValueWeapon}
            onChange={(event: any, newValue: any) => {
              console.log(event.type);
              setInputValueWeapon(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="T??m theo v?? kh??"
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="AR"
            name="ar"
            type={'number'}
            placeholder="Nh???p AR th???p nh???t"
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="T??m theo gi??"
            fullWidth
            value={rangeMoney}
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
              Ch???n gi??
            </MenuItem>
            <MenuItem value="1-10000">10k tr??? xu???ng</MenuItem>
            <MenuItem value="10000-50000">10K - 50K</MenuItem>
            <MenuItem value="50000-100000">50K - 100K</MenuItem>
            <MenuItem value="100000-200000">100K - 200K</MenuItem>
            <MenuItem value="200000-300000">200K - 300K</MenuItem>
            <MenuItem value="300000-400000">300K - 400K</MenuItem>
            <MenuItem value="400000-500000">400K - 500K</MenuItem>
            <MenuItem value="500000-800000">500K - 800K</MenuItem>
            <MenuItem value="800000-1000000">800K - 1tr</MenuItem>
            <MenuItem value="1000000-5000000">1tr - 5tr</MenuItem>
            <MenuItem value="5000000-999999999">Tr??n 5tr</MenuItem>
          </TextField>
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="S???p x???p gi??"
            fullWidth
            value={sort}
            onChange={handleChangeSort}
          >
            <MenuItem value="true"> Gi???m d???n</MenuItem>
            <MenuItem value="false">T??ng d???n</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            id="outlined-select-currency"
            select
            label="Server"
            fullWidth
            value={server}
            onChange={handleChangeServer}
          >
            <MenuItem value="ASIA">Asia</MenuItem>
            <MenuItem value="AMERICA">America</MenuItem>
            <MenuItem value="EUROPE">Europe</MenuItem>
            <MenuItem value="TW-HK-MO">TW-HK-MO</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="M?? s???"
            name="code"
            type={'number'}
            onChange={handleChangeInput}
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: 1, mb: 1 }}></Divider>
      <Box textAlign={'center'}>
        <Button variant="contained" color="secondary" onClick={submit}>
          T??m ki???m
        </Button>
      </Box>
    </Card>
  );
}

export default FilterVip;
