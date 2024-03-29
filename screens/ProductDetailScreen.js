import _ from "lodash"
import React, { useEffect, useState } from "react"
import Header from "../components/header/Header"
import Menu from "../components/header/Menu"
import VideoIntro from "../components/VideoIntro"
import Products from "../components/Products"
import Footer from "../components/Footer"
import Map from "../components/Map"
import ProductDetail from "../components/ProductDetail"
import api from "../api"
import utils from "../utils"
import { useRouter } from "next/router"

export default function ProductDetailScreen() {
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();

  const router = useRouter()
  const productId = utils.getCategoryId(_.get(router, "query.id"));
  const { videoIntro } = category || {};

  useEffect(() => {
    if (!_.isEmpty(productId)) {
      api.getProductById(productId).then(res => {
        const { categoryId } = res || {}
        setProduct({ ...res, productQuantity: 0 })
        if (!_.isUndefined(categoryId)) {
          api.getCategory(categoryId).then(setCategory)
          api.queryProduct({ categoryId }).then(res => _.get(res, "data.content")).then(res => {
            setTimeout(() => { setProducts(res) }, 500)
          });
        }
      })
    }

  }, [productId])
  return <div>
    <Header />
    <Menu />
    <ProductDetail data={product} />
    <Products data={products} />
    <div style={{ display: "flex", flex: 1, height: "80px", width: "100%", backgroundColor: "#ece9c4" }} />
    <VideoIntro videoIntro={videoIntro} />
    <Map />
    <Footer />
  </div>
}