import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Collapse, CssBaseline, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';
import PlaceToVisit from './PlaceToVisit';
import '../cssConfig/homepage.css';
import { Button, Carousel } from 'antd';
import { SearchOutlined, TagOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const contentStyle = {
    height: '100%',
    color: '#fff',
    lineHeight: '100%',
    textAlign: 'center',
    background: '#364d79',
};

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        // backgroundImage: `url("https://riceberrythaicuisine.co.uk/wp-content/uploads/2021/04/italian-food-background-1.jpg")`,
        backgroundImage: `url("https://wallpaperaccess.com/full/2614486.jpg")`,
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Nunito',
        "& html": {
            scrollBehavior: "smooth"
        }
    },
    container: {

    },
    colorText: {
        color: 'rgb(135, 232, 222)',
    },
    title: {
        color: '#fff',
        fontSize: '4rem'
    },
    goDown: {
        color: 'blue',
        width: '4rem'
    },

}));

export default function () {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
        console.log("collapse begin ")
    }, []);
    return (
        <div className='this-homepage'>
            {/* <CssBaseline />
                <div className={classes.root}>
                <div id="header">
                    <Collapse
                        in={checked}
                        {...(checked ? { timeout: 1000 } : {})}
                        collapsedSize={50}
                    >
                        <div className={classes.container}>
                            <h1 className={classes.title}>
                                Chào mừng <br /> đến với
                                <span className={classes.colorText}> SangOrder.</span>
                            </h1>
                            <Scroll to="place-to-visit" smooth={true}>
                                <IconButton>
                                    <KeyboardArrowDownIcon style={{ height: 40, width: 40 }} className={classes.goDown} />
                                </IconButton>
                            </Scroll>
                        </div>
                    </Collapse>
                </div>

            </div>
            <PlaceToVisit></PlaceToVisit> */}
            <div className='container-homepage'>
                <section className='section-homepage trang-bia' >
                    <h1 className='title'>
                        Chào mừng <br /> đến với
                        <span className={classes.colorText}> SangOrder.</span>
                    </h1>
                </section>
                <section className='section-homepage two-homepage' >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <div className='intro-box' style={{ width: "100%", height: 500, border: "1px solid" }}>
                                    <img src='https://chupanhmonan.com/wp-content/uploads/2018/04/Alan-De-Herrera-1024x683.jpg'
                                        style={{ width: "100%", height: 360 }}
                                    />
                                    <div style={{ fontFamily: "Nunito", padding: 10 }}>
                                        <h4>
                                            Mục đích
                                        </h4>
                                        <p>
                                            SangOrder là website được tạo nên với mục đích cung cấp một phương tiện để đặt thức ăn online một cách dễ dàng, nhanh chóng trên nền tảng web, giúp thỏa mãn cơn đói của bạn một cách nhanh chóng và thuận tiện nhất !
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xl-6'>
                                <div className='intro-box' style={{ width: "100%", height: 500, border: "1px solid" }}>
                                    <img src='https://www.adrianharrison.com.au/wp-content/uploads/2018/04/20180215-IMG_5276.jpg'
                                        style={{ width: "100%", height: 360 }}
                                    />
                                    <div style={{ fontFamily: "Nunito", padding: 10 }}>
                                        <h4>
                                            SangOrder có những gì ?
                                        </h4>
                                        <p>
                                            Hệ thống tìm kiếm, gợi ý các món ăn cho bạn theo loại thức ăn, theo sở thích của bạn, ảnh hưởng của những người dùng khác (hiệu ứng lan truyền), giúp bạn lựa chọn những món ăn ưng ý nhất một cách nhanh chóng, hiệu quả !
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='section-homepage three-homepage' >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <h3 className='click-chuot' style={{ color: "#141619", fontSize: 48, fontWeight: 30, marginBottom: 30 }}>
                                    Chỉ với một cú &emsp;&emsp;&emsp;&emsp;
                                    click chuột !
                                </h3>
                                <p style={{ color: "#7f8893", fontFamily: "Nunito", fontSize: 20, marginBottom: 48 }}>
                                    Với vài thao tác đơn giản, bạn đã có thể lựa chọn được những món ăn mình ưa thích nhất với hệ sinh thái gồm rất nhiều món ăn phong phú cùng với hệ thống gợi ý món ăn thông minh
                                </p>
                                <button class="button-56" role="button"><span style={{ fontFamily: "Nunito", fontSize: 20 }}>Khám phá ngay</span></button>
                            </div>

                            <div className='col-xl-6'>
                                <Carousel autoplay>
                                    <div>
                                        <img src='https://clicklovegrow.com/wp-content/uploads/2018/01/Image-10.jpg' style={{ width: "100%", height: 400, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                                    </div>
                                    <div style={{ backgroundColor: "red" }}>
                                        <img src='https://sp-ao.shortpixel.ai/client2/to_auto,q_lossy,ret_img/https://www.pixinfocus.com/wp-content/uploads/2020/09/dark-food-photography-1-907x774.jpg' style={{ width: "100%", height: 400, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                                    </div>
                                    <div style={{ backgroundColor: "red" }}>
                                        <img src='https://sp-ao.shortpixel.ai/client2/to_auto,q_lossy,ret_img,w_1000,h_675/https://www.pixinfocus.com/wp-content/uploads/2020/09/dark-food-photography-5.jpg' style={{ width: "100%", height: 400, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                                    </div>
                                    <div style={{ backgroundColor: "red" }}>
                                        <img src='https://format-com-cld-res.cloudinary.com/image/private/s--yU5hjwQS--/c_limit,g_center,h_1200,w_65535/fl_keep_iptc.progressive,q_95/v1/1a734fc5206bed55cf9be93c30ed8e52/RamenFeatured-1.jpg' style={{ width: "100%", height: 400, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='section-homepage four-homepage' >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xl-6'>
                                <img src='https://cdn.dribbble.com/users/3915664/screenshots/11188163/black_4x.png' style={{ width: "100%", height: 390, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} />
                            </div>
                            <div className='col-xl-6'>
                                <h3 className='click-chuot' style={{ color: "#141619", fontSize: 48, fontWeight: 30, marginBottom: 30 }}>
                                    Sự tương tác của bạn
                                    là cốt lõi để website&emsp;
                                    phát triển !
                                </h3>
                                <p style={{ color: "#7f8893", fontFamily: "Nunito", fontSize: 20, marginBottom: 30 }}>
                                    Bằng việc nhấn like và chia sẻ của bạn, SangOrder sẽ có cơ hội để tiếp cận tới nhiều người hơn, từ đó mang lại cho người dùng những đánh giá và chia sẻ tốt nhất
                                </p>
                                <p style={{ marginTop: 30 }}>&emsp;</p>
                                <div class="fb-like" data-href="https://sang-delivery-fe.herokuapp.com/"
                                    data-width="600px" data-layout="standard" data-action="like"
                                    data-size="large" data-share="true"></div>

                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-homepage">
                    <div class="container">
                        <div className='row'>
                            <div className='col-xl-6'>
                                <h3 className='click-chuot' style={{ color: "#141619", fontSize: 48, fontWeight: 30, marginBottom: 30 }}>
                                    Hệ thống món ăn &emsp;&emsp;
                                    đa dạng !
                                </h3>
                                <p style={{ color: "#7f8893", fontFamily: "Nunito", fontSize: 20, marginBottom: 30 }}>
                                    Bao gồm rất nhiều loại thức ăn khác nhau :
                                    <p>
                                        + Cơm, bún/phở
                                        <br />
                                        + Ăn vặt/Đồ ăn nhanh
                                        <br />
                                        + Đặc sản/Healthy
                                        <br />
                                        + Các loại đồ uống
                                    </p>
                                    <div style={{ marginTop: 40 }}>
                                        <span style={{ color: "#000", fontFamily: "Roboto", fontSize: 24 }}>Lựa chọn nào</span>
                                        <img src='https://nuskin88.com/wp-content/uploads/2020/03/ageloc-tr90-nuskin-7749-50.jpg' style={{ width: 120, height: 80, backgroundSize: "cover" }}></img>
                                    </div>
                                </p>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-lg-offset-0 col-md-6 col-md-offset-0 col-sm-10 col-sm-offset-1 col-xs-12">
                                <Carousel autoplay>
                                    <figure>
                                        <div class="media" style={{ backgroundImage: `url("https://cdn.profoto.com/cdn/05238cd/globalassets/tips-and-tricks/profoto-c1-plus-food-photography-anders-hannola.jpg?width=1200&quality=75&format=jpg")` }}></div>
                                        <figcaption><svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <mask id="mask" x="0" y="0" width="100%" height="100%">
                                                    <rect id="alpha" x="0" y="0" width="100%" height="100%"></rect><text class="title1" dx="50%" dy="2.5em">SELECT</text><text class="title1" dx="50%" dy="3.5em">YOUR</text><text class="title1" dx="50%" dy="4.5em">MENU</text>
                                                </mask>
                                            </defs>
                                            <rect id="base" x="0" y="0" width="100%" height="100%"></rect>
                                        </svg>
                                            <div class="body1">
                                                <p>&emsp;&ensp;Lựa chọn món ăn theo loại</p>
                                                <button class="button-6" role="button">Đi tới menu</button>
                                            </div>
                                        </figcaption><a href="#"></a>
                                    </figure>
                                    <figure>
                                        <div class="media" style={{ backgroundImage: `url("http://www.gommamag.com/wp-content/uploads/2019/07/Food-Photography-Techniques-You-need-to-Know.jpg")` }}></div>
                                        <figcaption><svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <mask id="mask" x="0" y="0" width="100%" height="100%">
                                                    <rect id="alpha" x="0" y="0" width="100%" height="100%"></rect><text class="title1" dx="50%" dy="2.5em">SELECT</text><text class="title1" dx="50%" dy="3.5em">YOUR</text><text class="title1" dx="50%" dy="4.5em">MENU</text>

                                                </mask>
                                            </defs>
                                            <rect id="base" x="0" y="0" width="100%" height="100%"></rect>
                                        </svg>
                                            <div class="body1">
                                                <p>&emsp;&ensp;Lựa chọn món ăn gần bạn nhất</p>
                                                &ensp;<button class="button-50" role="button">Món ăn gần tôi</button>
                                            </div>
                                        </figcaption><a href="#"></a>
                                    </figure>
                                    <figure>
                                        <div class="media" style={{ backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/561646c6e4b0f890085faa02/1610298624970-WIX4XMHGZYKTW2Z2738T/Food+Photography+Workshop")` }}></div>
                                        <figcaption><svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <mask id="mask" x="0" y="0" width="100%" height="100%">
                                                    <rect id="alpha" x="0" y="0" width="100%" height="100%"></rect><text class="title1" dx="50%" dy="2.5em">SELECT</text><text class="title1" dx="50%" dy="3.5em">YOUR</text><text class="title1" dx="50%" dy="4.5em">MENU</text>

                                                </mask>
                                            </defs>
                                            <rect id="base" x="0" y="0" width="100%" height="100%"></rect>
                                        </svg>
                                            <div class="body1">
                                                <p>&emsp;&ensp;Tìm các món ăn mà bạn muốn</p>
                                                &ensp;&ensp;&ensp;<button class="button-59" role="button">Đi đến tìm kiếm</button>
                                            </div>
                                        </figcaption><a href="#"></a>
                                    </figure>
                                    <figure>
                                        <div class="media" style={{ backgroundImage: `url("https://www.ppa.com/assets/images/ppmag_articles/2019320160929_ftinc_286_2.jpg")` }}></div>
                                        <figcaption><svg viewBox="0 0 200 200" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <mask id="mask" x="0" y="0" width="100%" height="100%">
                                                    <rect id="alpha" x="0" y="0" width="100%" height="100%"></rect><text class="title1" dx="50%" dy="2.5em">SELECT</text><text class="title1" dx="50%" dy="3.5em">YOUR</text><text class="title1" dx="50%" dy="4.5em">MENU</text>

                                                </mask>
                                            </defs>
                                            <rect id="base" x="0" y="0" width="100%" height="100%"></rect>
                                        </svg>
                                            <div class="body1">
                                                <p>&emsp;Lựa chọn món ăn đang giảm giá</p>
                                                &ensp;<button class="button-50" role="button">Món ăn giảm giá</button>
                                            </div>
                                        </figcaption><a href="#"></a>
                                    </figure>

                                </Carousel>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}