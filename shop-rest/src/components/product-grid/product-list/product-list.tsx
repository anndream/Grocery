import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./product-list.style";
import { CURRENCY } from "utils/constant";
import Placeholder from "components/placeholder/placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/no-result/no-result";
import { FormattedMessage } from "react-intl";
import { Button } from "components/button/button";
import useProducts from "data/use-products";
const ErrorMessage = dynamic(() => import("components/error-message/error-message"));
const GeneralCard = dynamic(import("components/product-card/product-card-one/product-card-one"));

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  fetchLimit?: number;
  loadMore?: boolean;
  type?: string;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  fetchLimit = 20,
  loadMore = true,
  type,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data, error } = useProducts({
    type,
    text: router.query.text,
    category: router.query.category,
    offset: 0,
    limit: fetchLimit,
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (!data) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (data.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = async () => {
    setLoading(true);
    // await fetchMore(Number(data.length), fetchLimit);
    setLoading(false);
  };

  const renderCard = (productType, props) => {
    return (
      <GeneralCard
        title={props.name}
        description={props.description}
        image={props.bannerImage}
        weight={props.product_unit}
        currency={CURRENCY}
        price={props.stock_amount}
        salePrice={props.discount_amount}
        discountInPercent={props.discount_percentage}
        data={props}
        deviceType={deviceType}
      />
    );
  };

  return (
    <>
      <ProductsRow>
        {data.map((item: any, index: number) => (
          <ProductsCol
            key={index}
            style={type === "book" ? { paddingLeft: 0, paddingRight: 1 } : {}}
          >
            <ProductCardWrapper>
              <Fade duration={100} delay={index * 10} style={{ height: "100%" }}>
                {renderCard(type, item)}
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>

      {loadMore && data?.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            style={{
              fontSize: 14,
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
