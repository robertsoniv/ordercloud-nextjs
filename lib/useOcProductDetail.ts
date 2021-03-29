import { BuyerProduct } from "ordercloud-javascript-sdk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OcRootState } from "../redux/appStore";
import {
  OcCatalogProductDetailState,
  setProduct,
} from "../redux/slices/ocCatalog";
import useOcAuth from "./useOcAuth";

export default function useOcProductDetail(productId: string) {
  const dispatch = useDispatch();
  const { isAuthenticated, isAnonymous } = useOcAuth();
  const { product, error }: OcCatalogProductDetailState = useSelector(
    (state: OcRootState) => state.ocCatalog.products.current
  );

  useEffect(() => {
    if (!productId || !isAuthenticated) return;
    dispatch(setProduct(productId));
  }, [dispatch, isAuthenticated, isAnonymous, productId]);

  return { product, error };
}
