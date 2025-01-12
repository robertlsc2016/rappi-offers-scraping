import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Skeleton,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getProducts from "../services/getProducts";

import getInfosStore from "../services/getInfosStore";
import SearchBar from "../components/SearchBar";
import CardProduct from "../components/CardProduct";
import ContainerAccordionProducts from "../components/ContainerAccordionProducts";
import { useDispatch } from "react-redux";
import { initial } from "../redux/statusViewSlice";
import {
  BodyHeader,
  ButtonReturn,
  S_BodyMarket,
  S_BodyMarketInner,
  S_BodyMarketSearching,
  S_Header,
  S_LayoutMarketsContainer,
  SBoxChips,
} from "../styles/LayoutMarkets.styles";
import ScrollToTopButton from "../components/ScrollToTopButton";
import getNewProductsStore from "../services/getNewProducts";

const LayoutMarkets = ({ id_store, parent_store_type, store_type, name }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [newItens, setNewItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBody, setLoadingBody] = useState(true);
  const [products, setProducts] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const [lengthArryFiltered, setLengthArryFiltered] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    get_new_itens();
    get_products();
  }, []);

  const get_new_itens = () => {
    return getNewProductsStore({
      id_store,
      parent_store_type,
      store_type,
    }).then((res) => {
      setNewItens(res.products);
    });
  };

  const get_products = async () => {
    const productsData = await getProducts({
      id_store,
      parent_store_type,
      store_type,
      name,
    });

    setProducts(productsData);
    setLoading(false);
  };

  const inputValue = (text) => {
    setTextFilter(text);
    setLoadingBody(true);
  };

  function filterItems(text) {
    const items = products;

    const filteredItems = items.all.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredItems(filteredItems);
    setLoadingBody(false);
  }

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(textFilter);
    }, 800);

    return () => clearTimeout(handler);
  }, [textFilter]);

  useEffect(() => {
    if (debouncedQuery) {
      filterItems(debouncedQuery);
      ArrayProducts();
      setLoadingBody(false);
    }
  }, [debouncedQuery, products]);

  const ArrayProducts = () => {
    const productsFilter = products.all
      .filter((item) =>
        item.name.toLowerCase().includes(textFilter.toLowerCase())
      )
      .map(
        ({
          id,
          name,
          price,
          discount,
          real_price,
          image_url,
          quantity,
          unit_type,
        }) => (
          <CardProduct
            key={id}
            unit_type={unit_type}
            quantity={quantity}
            name={name}
            price={price}
            discount={discount}
            image={image_url}
            real_price={real_price}
          />
        )
      );

    setFilteredItems(productsFilter);
    setLengthArryFiltered(productsFilter.length);
    return productsFilter;
  };

  return (
    <>
      <ScrollToTopButton />

      <S_LayoutMarketsContainer className="container">
        <S_Header>
          <ButtonReturn>
            <Link to="/" onClick={() => dispatch(initial())}>
              <IconButton>
                <WestIcon />
              </IconButton>
            </Link>
          </ButtonReturn>
          <BodyHeader>
            <h1 style={{ margin: 0, padding: 0 }}>{name}</h1>

            <SBoxChips>
              <Chip label={`ID: ${id_store}`} color="info" size="small" />
              {!loading && (
                <Chip
                  label={` ${products.all.length || 0} itens`}
                  color="info"
                  size="small"
                />
              )}
            </SBoxChips>
          </BodyHeader>
        </S_Header>

        <S_BodyMarket className="body-market">
          {loading ? (
            <>
              {Array(50)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    key={index}
                  />
                ))}
            </>
          ) : (
            <>
              <S_BodyMarketInner>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "fit-content",
                  }}
                >
                  <SearchBar inputValue={inputValue} widthSearchArea="60%" />
                  <div
                    className="body-products"
                    style={{
                      borderRadius: "16px",
                      width: "100%",
                      height: "fit-content",
                    }}
                  >
                    {textFilter.length === 0 ? (
                      <ContainerAccordionProducts
                        new_products={newItens}
                        parent_store_type={parent_store_type}
                        store_type={store_type}
                        products={products}
                        id_store={id_store}
                      />
                    ) : (
                      <>
                        {loadingBody && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <CircularProgress size="30px" />
                          </div>
                        )}
                        {!loadingBody && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexDirection: "column",
                              alignItems: "center",
                              background: "white",
                              width: "100%",
                              height: "100%",
                              borderRadius: "16px",
                              // border: "1px solid black",
                            }}
                          >
                            {filteredItems.length == 0 && <>Nada Encontrado</>}
                            <S_BodyMarketSearching>
                              <>
                                {lengthArryFiltered.length === 0 ? (
                                  <>Nenhum item foi encontrado :(</>
                                ) : (
                                  <>
                                    {filteredItems.map(
                                      ({
                                        props: {
                                          id,
                                          unit_type,
                                          quantity,
                                          name,
                                          price,
                                          discount,
                                          image,
                                          real_price,
                                        },
                                      }) => (
                                        <CardProduct
                                          key={id}
                                          unit_type={unit_type}
                                          quantity={quantity}
                                          name={name}
                                          price={price}
                                          discount={discount}
                                          image={image}
                                          real_price={real_price}
                                        />
                                      )
                                    )}
                                  </>
                                )}
                              </>
                            </S_BodyMarketSearching>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </S_BodyMarketInner>
            </>
          )}
        </S_BodyMarket>
      </S_LayoutMarketsContainer>
    </>
  );
};

export default LayoutMarkets;
