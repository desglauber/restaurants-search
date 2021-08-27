import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

import restaurante from "../../assets/galinheiro.png";
import Skeleton from "../Skeleton";

import { Restaurant, ResturantInfo, Title, Address, RestaurantPhoto } from "./styles";

const RestaurantCard = ({ restaurant, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Restaurant onClick={onClick}>
            <ResturantInfo>
                <Title>{restaurant.name}</Title>
                <ReactStars count={5} isHalf value={restaurant.rating} edit={false} activeColor="#e7711c" />
                <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
            </ResturantInfo>
            <RestaurantPhoto
                imageLoaded={imageLoaded}
                src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                onLoad={() => setImageLoaded(true)}
                alt="Foto do restaurante"
            />
            {!imageLoaded && <Skeleton width="100px" height="100px" />}
        </Restaurant> 
    );        
};

export default RestaurantCard;

//<Restaurant>
//        <ReaturantInfo>
//            <Title>Galinheiro</Title>
//            <ReactStars count={5} isHalf value={4} edit={false} activeColor="#e7711c" />
//            <Address>Av. Jorn. Umberto Calderaro Filho - Adrianópolis, Manaus - AM, 69057-015</Address>
//        </ReaturantInfo>
//        <RestaurantPhoto src={restaurante} alt="Galinheiro" />
//    </Restaurant>