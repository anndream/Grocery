import { NextPage } from "next";
import { useRouter } from "next/router";
import ProductDetailsFood from "components/product-details/product-details-three/product-details-three";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, { ProductSingleContainer } from "assets/styles/product-single.style";
import { SEO } from "components/seo";
import { getAllVendors, getVendorBySlug } from "utils/api/vendor";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
};

const ProductPage: NextPage<Props> = ({ data, deviceType }) => {
  const router = useRouter();

  if (router.isFallback) return <p>Loading...</p>;

  return (
    <>
      <SEO title={`${data?.name} - PickBazar`} description={`${data?.name} Details`} />
      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            <ProductDetailsFood product={data} deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

export default ProductPage;
