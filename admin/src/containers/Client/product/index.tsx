import React, { lazy } from "react";
import { SEO } from "components/Client/seo";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, { ProductSingleContainer } from "assets/styles/product-single.style";
import { getAllProducts, getProductById } from "services/product";
import ProductDetails from "components/Client/product-details/product-details";
import CartPopUp from "components/Client/cart/cart-popup";
// const ProductDetails = lazy(() => import("components/Client/product-details/product-details"));
// const CartPopUp = lazy(() => import("components/Client/cart/cart-popup"));

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const ProductPage = ({ data, deviceType }) => {
  let content = <ProductDetails product={null} deviceType={deviceType} />;

  return (
    <>
      <SEO title={`${data.title} - PickBazar`} description={`${data.title} Details`} />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CartPopUp deviceType={deviceType} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

// export async function getStaticProps({ params }) {
//   const data = await getProductById(params.slug);
//   return {
//     props: {
//       data,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const products = await getAllProducts();
//   return {
//     paths: products ? products.slice(0, 10).map(({ id }) => ({ params: { id } })) : [],
//     fallback: false,
//   };
// }
export default ProductPage;
