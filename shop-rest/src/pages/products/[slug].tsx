import React from "react";
import dynamic from "next/dynamic";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, { ProductSingleContainer } from "assets/styles/product-single.style";
import { getAllProducts, getProductById } from "utils/api/product";
import { useRouter } from "next/router";

const ProductDetails = dynamic(
  () => import("components/product-details/product-details-four/product-details-four")
);
const ProductDetailsBakery = dynamic(
  () => import("components/product-details/product-details-five/product-details-five")
);

const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});
interface Props {
  data: any;
  deviceType: any;
}

export async function getStaticProps({ params }) {
  const data = await getProductById(params.slug);
  return {
    props: {
      data,
    },
  };
}
export async function getStaticPaths() {
  const products = await getAllProducts();
  return {
    paths: products ? products.slice(0, 10).map(({ slug }) => ({ params: { slug } })) : [],
    fallback: false,
  };
}
const ProductDetailsPage = ({ data, deviceType }: Props) => {
  const router = useRouter();
  if (router.isFallback) return <p>Loading...</p>;
  let content = <ProductDetails product={data} deviceType={deviceType} />;
  if (data.type === "bakery") {
    content = <ProductDetailsBakery product={data} deviceType={deviceType} />;
  }
  return (
    <Modal>
      <ProductSingleWrapper>
        <ProductSingleContainer>
          {content}
          <CartPopUp deviceType={deviceType} />
        </ProductSingleContainer>
      </ProductSingleWrapper>
    </Modal>
  );
};
export default ProductDetailsPage;
