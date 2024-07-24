import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

// material-ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ClientsListEmpty from "./ClientsListEmpty";

import ClientCard from "../../../../ui-component/cards/ClientCard";
import FloatingCart from "../../../../ui-component/cards/FloatingCard";
import SkeletonClientPlaceholder from "../../../../ui-component/cards/Skeleton/ClientPlaceholder";

// import { resetCart } from "store/slices/cart";
// import { dispatch, useSelector } from "store";
import { gridSpacing } from "../../../../store/constant";

import { filterProducts } from "../../../../api/products";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// ==============================|| E-COMMERCE - PRODUCT GRID ||============================== //

const ClientsList = () => {
  //   const cart = useSelector((state) => state.cart);

  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const matchDownLG = useMediaQuery((theme) => theme.breakpoints.down("xl"));

  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    setProductLoading(false);
  }, []);

  // drawer
  const [open, setOpen] = useState(productLoading);

  // product data
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState(initialProducts);

  // filter
  const initialState = {
    search: "",
    sort: "low",
    gender: [],
    categories: ["all"],
    colors: [],
    price: "",
    rating: 0,
  };
  const [filter, setFilter] = useState(initialState);

  const filterData = async (filter) => {
    await filterProducts(filter).then((response) => {
      setProducts(response.data);
      setProductLoading(false);
    });
  };

  useEffect(() => {
    filterData(filter);
  }, [filter]);

  //   useEffect(() => {
  //     // clear cart if complete order
  //     if (cart.checkout.step > 2) {
  //       dispatch(resetCart());
  //     }
  //   }, [cart.checkout.step]);

  useEffect(() => {
    setOpen(!matchDownLG);
  }, [matchDownLG]);

  let productResult = <></>;
  if (products && products.length > 0) {
    productResult = products.map((product, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
        <ClientCard
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          offerPrice={product.offerPrice}
          salePrice={product.salePrice}
          rating={product.rating}
          color={product.colors ? product.colors[0] : undefined}
        />
      </Grid>
    ));
  } else {
    productResult = (
      <Grid item xs={12} sx={{ mt: 3 }}>
        <ClientsListEmpty />
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={matchDownMD ? 0.5 : 2}
        >
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4">Clients</Typography>
              <IconButton size="large" aria-label="go to shopping">
                <ArrowForwardIosIcon
                  sx={{
                    width: "0.875rem",
                    height: "0.875rem",
                    fontWeight: 500,
                    color: "grey.500",
                  }}
                />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: "flex" }}>
          <Stack open={open}>
            <Grid container spacing={gridSpacing}>
              {productLoading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <Grid key={item} item xs={12} sm={6} md={4} lg={3}>
                      <SkeletonClientPlaceholder />
                    </Grid>
                  ))
                : productResult}
            </Grid>
          </Stack>
        </Box>
      </Grid>
      {/* <FloatingCart /> */}
    </Grid>
  );
};

export default ClientsList;
