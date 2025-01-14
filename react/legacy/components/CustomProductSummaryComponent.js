import { useEffect, useState } from 'react'
import { canUseDOM, Link } from 'vtex.render-runtime'
import styles from '../styles/custom-product-summary-component'
import ExpressIcon from './ExpressIcon'

function CustomProductSummaryComponent({
    product,
    handleMouseEnter,
    handleMouseLeave,
    inViewRef,
    listName,
    isSearchPage
}) {
    const [isHover, setIsHover] = useState(false);
    const [isBlackfriday, setIsBlackfriday] = useState(false)

    useEffect(() => {
        if(window?.location?.pathname === '/blackfriday')
            setIsBlackfriday(true)
    },[window.location])

    return (
        <div
            className={`${styles.sonoma_shelf_item} ${
                isBlackfriday ? 
                styles.blackfriday :
                ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={inViewRef}
        >
            <meta itemProp="sku" content={product.sku.itemId} />
            <meta itemProp="description" />
            <figure className={styles.thumbnail} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                <div className={styles.flags}>
                    {getSeals(product)}
                </div>
                <div className={styles.preSaleFlag} hidden={!getIsPreSale(product)}>
                    PRÉ-VENDA
                </div>
                {
                product.sku.seller.commertialOffer.AvailableQuantity ? 
                <div className={styles.highlightWrapper}>
                    <div className={`${styles.discountHighlight}`} hidden={!doesProductHaveDiscount(product)}>
                        {`ATÉ ${calculateDiscountHighlight(product)}`}
                    </div>
                </div> : null
                }
                <div className={styles["sonoma-image"]} itemProp="image">
                    <Link
                        page="store.product"
                        params={{
                            slug: product && product.linkText,
                            __listName: listName,
                        }}
                        to={`/${product.linkText}/p`} itemProp="url"
                    >
                        <picture style={isHover ? { display: 'none' } : {}}>
                            <source media="(max-width: 320px)" width="128" height="128" srcSet={resizeImg(product, 128, false)} />
                            <source media="(max-width: 425px)" width="150" height="150" srcSet={resizeImg(product, 150, false)} />
                            <source media="(max-width: 425px)" width="170" height="170" srcSet={resizeImg(product, 170, false)} />
                            <source media="(min-width: 1000px)" width="236" height="236" srcSet={resizeImg(product, 236, false)} />
                            <img loading="lazy" itemProp="image" width="236" height="236" src={resizeImg(product, 236, false)} alt={product.productName} />
                        </picture>
                        <picture style={!isHover ? { display: 'none' } : {}}>
                            <source media="(max-width: 320px)" width="128" height="128" srcSet={resizeImg(product, 128, true)} />
                            <source media="(max-width: 425px)" width="150" height="150" srcSet={resizeImg(product, 150, true)} />
                            <source media="(max-width: 425px)" width="170" height="170" srcSet={resizeImg(product, 170, true)} />
                            <source media="(min-width: 1000px)" width="236" height="236" srcSet={resizeImg(product, 236, true)} />
                            <img loading="lazy" itemProp="image" width="236" height="236" src={resizeImg(product, 236, true)} alt={product.productName} />
                        </picture>
                    </Link>
                </div>
            </figure>
            <div className={styles.content}>
                <div className={styles["brand-container"]}>
                </div>
                <div className={styles["location-container"]}>
                    <Link
                        title={product.productName}
                        aria-label={product.productName}
                        page="store.product"
                        params={{
                            slug: product && product.linkText,
                            __listName: listName,
                        }}
                        to={`/${product.linkText}/p`}
                    >
                        <p className={styles["sonoma-paragraph-location"]} itemProp="location">
                            {`${getRegion(product)} ${getCountry(product)}`}
                        </p>
                    </Link>
                </div>

                {isSearchPage ?
                    <h2 className={styles["sonoma-title"]} itemProp="name">
                        {_mountProductName(product)}
                    </h2>
                    :
                    <h3 className={styles["sonoma-title"]} itemProp="name">
                        {_mountProductName(product)}
                    </h3>
                }


                {
                    product.sku.seller.commertialOffer.AvailableQuantity ? <>
                        <div itemProp="offers" itemScope="itemScope" itemType="http://schema.org/AggregateOffer" className={styles["prices"]}>
                            <meta itemProp="availability" content="https://schema.org/InStock" />
                            <meta itemProp="priceCurrency" content="BRL" />
                            <meta itemProp="highPrice" content={product.priceRange.listPrice.highPrice} />
                            <meta itemProp="lowPrice" content={product.priceRange.sellingPrice.lowPrice} />
                            <div className={styles.highlightWrapper}>
                                {
                                    canUseDOM && <div className={styles.expressDelivery} hidden={!isExpressDelivery(product)}>
                                        <ExpressIcon color={'#85B074'} />
                                        Entrega expressa
                                    </div>
                                }
                            </div>
                            <div className={styles["offer-container"]}>
                                <div className={`${styles["oldprice-container"]} ${doesProductHaveDiscount(product) ? '' : styles["no-discount"]}`}>
                                    <Link
                                        page="store.product"
                                        params={{
                                            slug: product && product.linkText,
                                            __listName: listName,
                                        }}
                                        to={`/${product.linkText}/p`}
                                        className={styles.oldprice}
                                    >
                                        De
                                        <span className={styles["sonoma-currency"]}>
                                            {getPrecoDe(product) ? formatCurrency(getPrecoDe(product)) : formatCurrency(product.priceRange.listPrice.lowPrice)}
                                        </span>
                                        por
                                    </Link>
                                </div>
                            </div>
                            <div className={styles["price-container"]}>
                                <div className={styles["price-container-box"]} hidden={!haveMinAmountForBoxPrice(product)}>
                                    <Link
                                        title={product.productName}
                                        aria-label={product.productName}
                                        page="store.product"
                                        params={{
                                            slug: product && product.linkText,

                                            __listName: listName,
                                        }}
                                        to={`/${product.linkText}/p`}
                                        className={styles["price-box"]}
                                    >
                                        <span className={styles["sonoma-currency"]}>
                                            {formatCurrency(getBoxPrice(product))}
                                        </span>
                                        <span className={styles["price-unity"]}>
                                            {getBoxPrice(product) && "Na caixa ou"}
                                        </span>
                                    </Link>
                                </div>
                                <div className={styles["price-container-unity"]}>
                                    <Link
                                        page="store.product"
                                        params={{
                                            slug: product && product.linkText,
                                            __listName: listName,
                                        }}
                                        to={`/${product.linkText}/p`}
                                        className={styles["price"]}
                                    >
                                        <span className={styles["sonoma-currency"]}>
                                            {formatCurrency(product.priceRange.sellingPrice.lowPrice)}
                                        </span>
                                        <span className={styles["price-unity"]}>
                                            Unidade
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </> : <p className={styles.shelf__indisponivel}>Esgotado</p>
                }
            </div>
        </div>
    )
}

function getPrecoDe(product) {
    if (
      product.properties.filter((property) => property.name === "preco_de")[0]?.values?.[0]
    )
      return Number(product.properties.filter((property) => property.name === "preco_de")[0].values[0].replace(".","").replace(",","."));
    return null;
  }


function getRegion(product) {
    const region = product.properties.filter(property => property.name === "Regiões")[0]
    return region ? `${region.values[0]},` : '';
}

function getCountry(product) {
    const country = product.properties.filter(property => property.name === "País")[0]
    return country ? country.values[0] : '';
}

function formatCurrency(value) {
    if (value)
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getBoxPrice(product) {
    if (product.sku.sellers?.[0]?.commertialOffer?.teasers?.[0]?.name && 
        product.sku.sellers?.[0]?.commertialOffer?.teasers?.[0]?.name.includes("/")) {
        const discount = product.sku.sellers[0].commertialOffer.teasers[0].name.split("/")[1]
        const discountFormated = discount.replace(',', '.').replace(/[^\d.]/g, ''); //Regex tira todos os chars menos numeros ;P
        return product.priceRange.sellingPrice.lowPrice * (1 - discountFormated / 100)
    }
}

function resizeImg(product, desiredSize, isHover) {
    let imgIndex;
    if (isHover && product.sku.images[1])
        imgIndex = 1;
    else
        imgIndex = 0;

    const imgUrlArray = product.sku.images[imgIndex].imageUrl.split("-")
    const resizedImgUrl = `${imgUrlArray[0]}-${desiredSize}-${desiredSize}`
    return resizedImgUrl
}

const premiacoesSRC = {
    bestSellers: "sprites-best-seller",
    organico: "sprites-organico",
    natural: "sprites-natural",
    blackfriday: "sprites-blackfriday",
    /* "Caixa Mista": "sprites-mista", */
    Pontuação: "sprites-medal"
};

function getClusterSeals(product) {
    const productClusterList = product.productClusters.map(cluster => cluster.name)
    return productClusterList.map(clusterName => {
        if(clusterName.includes("selos=[") && clusterName.includes("blackfriday"))
            return {
                name: "ClusterSeal",
                specifications: [
                    {
                        name: "blackfriday",
                        values: ['Ativo']
                    }
                ]
            };
    }).filter(seal => seal?.specifications)
}

function getSeals(product) {
    const clusterSeals = getClusterSeals(product)
    const seals = [...clusterSeals, ...product.specificationGroups.filter(property => property.name === "Selos")]
    const ratings = product.specificationGroups.filter(property => property.name === "Pontuação")

    if (!seals.length && !ratings.length)
        return;

    return (
        <>
            {seals.map(seal => _mountSeal(seal, false))}
            {ratings.map(rating => _mountSeal(rating, true))}
        </>
    )
}

function doesProductHaveDiscount(product) {
    if(getPrecoDe(product))
        return true
    return (product.priceRange.listPrice.lowPrice >= product.priceRange.sellingPrice.lowPrice * 1.05)
}

function getIsPreSale(product) {
    return product.properties?.filter(property => property.name === "Pré-venda")?.[0]?.values?.[0] === "Ativo"
}

function _mountSeal(_seal, isRating) {
    return _seal.specifications.map(seal => {
        if (!premiacoesSRC[seal.name] && !isRating)
            return null;

        return (
            <figure className={styles.seals__item} key={seal.name}>
                <i
                    className={`sonoma-sonoma-io-2-x-sprites sonoma-sonoma-io-2-x-${!isRating
                        ? premiacoesSRC[seal.name]
                        : premiacoesSRC["Pontuação"]
                        }`}
                />
                <figcaption className={styles.seals__caption}>
                    <p className={styles.seals__points}>
                        {seal.values?.[0] !== "Ativo" && seal.values[0]}
                    </p>
                    <p className={styles.seals__avaliator}>
                        {seal.values?.[0] !== "Ativo" && isRating && seal.name}
                    </p>
                </figcaption>
            </figure>
        )
    })
}

function _mountProductName(product) {
    return (
        <Link
            page="store.product"
            params={{
                slug: product && product.linkText,
                __listName: product.productName,
            }}
            to={`/${product.linkText}/p`}
        >
            <span className={styles["formatted-text"]}>
                {product.productName.toLowerCase()}
            </span>
        </Link>
    )
}

function haveMinAmountForBoxPrice(product) {
    return product.sku.seller?.commertialOffer?.AvailableQuantity >= getBoxAmount(product);
}

function getBoxAmount(product) {
    return product.sku.seller?.commertialOffer?.teasers?.[0]?.name.split("/")?.[0] || 0;
}

function calculateDiscountHighlight(product) {
    const boxPrice = getBoxPrice(product);
    const customPrecoDe = getPrecoDe(product)
    return `${100 - ((((boxPrice ? boxPrice : product.priceRange.sellingPrice.lowPrice) / 
    (customPrecoDe ? customPrecoDe : product.priceRange.listPrice.highPrice)) * 100).toFixed(0))}% OFF`
}

function isExpressDelivery(product) {
    const isFromSp = JSON.parse(localStorage.getItem('userAdress'))
    if(!(isFromSp?.localidade === "São Paulo"))
        return false

    if(product.properties?.filter(property => property.name === "isExpress")?.[0]?.values?.[0] !== "Ativo")
        return false

    return true
}

export default React.memo(CustomProductSummaryComponent);