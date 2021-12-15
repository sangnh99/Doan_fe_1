import React, { Component } from 'react';
import 'antd/dist/antd.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import Card from '../card/card.js';
import Divider from '@mui/material/Divider';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MenuCategory from './menu-category.js';
import HeroSession from '../decorate-component/hero-session.js';

export default class TitlebarImageList extends Component {
  render() {

    return (
      <div>

        <div className="container">
          <HeroSession />
          <ImageList sx={{ width: 1100, height: 550 }}>
            <ImageListItem key="Subheader" cols={3}>

            </ImageListItem>
            {itemData.map((item) => (
              <Link to={{ pathname: `/menu/${item.path}`}} style={{ borderRadius: "20px" }}>

                <ImageListItem key={item.img} style={{ width: 350, height: 250 }}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: 350, height: 250 }}
                  />
                  <ImageListItemBar
                    title={item.title}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                      >

                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
          <Divider />
          <div className="row">

            <Card
              author={recipeAuthor}
              title={recipeItem.title}
              date={recipeItem.date}
              description={recipeItem.description}
              ima="https://www.thaistreet.com.vn/wp-content/uploads/2021/04/Food.jpg"
              liked={isLiked}
              likeCount={like}
            />
            <Card
              author={recipeAuthor}
              title={recipeItem.title}
              date={recipeItem.date}
              description={recipeItem.description}
              ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
              liked={isLiked}
              likeCount={like}
            />

            <Card
              author={recipeAuthor}
              title={recipeItem.title}
              date={recipeItem.date}
              description={recipeItem.description}
              ima="https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg"
              liked={isLiked}
              likeCount={like}
            />
          </div>

        </div>

        <div>
            {/* <Link to={"menu/category/rice"}> <div>Day la router</div></Link> */}
          </div>


      </div>
    );
  }
}

const itemData = [
  {
    img: 'https://i.pinimg.com/originals/a7/29/b9/a729b92989a8250e4c7191cbe0179225.jpg',
    title: 'Cơm',
    path: 'rice',
    author: '@bkristastucchio',
    featured: true,
  },
  {
    img: 'https://thumbs.dreamstime.com/b/pho-bo-vietnamese-fresh-rice-noodle-soup-beef-herbs-chili-black-background-top-view-183971432.jpg',
    title: 'Bún / Phở',
    path: 'noodle',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://www.uplevo.com/blog/wp-content/uploads/2019/07/y-tuong-kinh-doanh-do-an-vat.jpg',
    title: 'Ăn vặt',
    path: 'fastfood',
    author: '@helloimnik',
  },
  {
    img: 'https://media-cdn.tripadvisor.com/media/photo-s/19/a8/70/47/banh-xeo-nam-b-vietnamese.jpg',
    title: 'Đặc sản',
    path: 'speciality',
    author: '@nolanissac',
  },
  {
    img: 'https://img.lovepik.com/photo/50112/0749.jpg_wh860.jpg',
    title: 'Healthy',
    path: 'healthy',
    author: '@hjrc33',
  },
  {
    img: 'https://us.123rf.com/450wm/topntp/topntp1901/topntp190104469/115462300-taiwan-milk-tea-with-bubble-on-wood-background.jpg?ver=6',
    title: 'Dồ uống',
    path: 'drink',
    author: '@southside_customs',
  },
];

const recipeAuthor = "Efecan";
const recipeItem = {
  title: "Avokado Ezmeli Taco",
  date: "8 Haziran 2021, Salı",
  image: "https://hoclaixecaptoc.com/wp-content/uploads/2018/11/food-l%C3%A0-g%C3%AC.jpg",
  description:
    "Bu kremsi ve ",
};

const like = 193;
const isLiked = true;