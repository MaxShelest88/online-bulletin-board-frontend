import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementAPI from 'Services/AdvertisementAPI';
import BrandsAPI from 'Services/BrandsAPI';
import CategoriesAPI from 'Services/CategoriesAPI';

const useFetchLoginDataAdvertisement = () => {
  const { advertisementId } = useParams();

  const {
    data: {
      brandId, categoryId, createdAt, description, price, status, title, userId, updatedAt,
    } = {},
    isLoading: isLoadingAdvertisement,
  } = AdvertisementAPI.useGetOneMaybeNotPublicQuery(Number(advertisementId));
  const {
    data: dataImagesAdvertisement = [],
    isLoading: isLoadingImagesAdvertisement,
  } = AdvertisementAPI.useGetImagesQuery(Number(advertisementId));
  const {
    data: dataCategories, isLoading: isLoadingCategories,
  } = CategoriesAPI.useGetCategoriesQuery();
  const [
    target,
    { data: dataBrands, isSuccess: isSuccessBrands },
  ] = BrandsAPI.useLazyGetBrandsQuery();

  useEffect(() => {
    if (categoryId) {
      target(categoryId);
    }
  }, [categoryId, target]);

  const res = {
    brandId,
    categoryId,
    createdAt,
    description,
    price,
    status,
    title,
    userId,
    dataImagesAdvertisement,
    dataCategories,
    dataBrands,
    isLoading: false,
    updatedAt,
  };

  if (
    isLoadingAdvertisement
    && isLoadingImagesAdvertisement
    && isSuccessBrands
    && isLoadingCategories
  ) {
    return { ...res, isLoading: true };
  }

  return res;
};

export default useFetchLoginDataAdvertisement;
