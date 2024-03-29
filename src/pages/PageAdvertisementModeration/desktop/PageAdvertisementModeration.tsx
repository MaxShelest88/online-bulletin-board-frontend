import React from 'react';
import AdvertisementsRibbon from 'Components/AdvertisementsRibbon/AdvertisementsRibbon';
import Header from 'Components/Header/Header';
import Container from 'Storybook/Container/Container';
import { useAppSelector } from 'Hooks/redux';
import AdvertisementAPI from 'Services/AdvertisementAPI';

const PageAdvertisementModeration = () => {
  const advertisementSearch = useAppSelector(({ inputs }) => inputs.inputs.advertisementSearch);
  const {
    data,
    isLoading,
  } = AdvertisementAPI.useGetAllOnModerationQuery({
    limit: 14,
    page: 1,
    title: advertisementSearch,
    brandId: 0,
    categoryId: 0,
    sort: '',
  });

  return (
    <div>
      <Header />
      <Container>
        <AdvertisementsRibbon data={data} isLoading={isLoading} />
      </Container>
    </div>
  );
};

export default PageAdvertisementModeration;
