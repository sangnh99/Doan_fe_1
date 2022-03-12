import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react';
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings,
} from 'react-icons/fi';

import { IoPawOutline, IoLockClosedOutline, IoHeartOutline, IoLocationOutline } from 'react-icons/io5';
import NavItem from './NavItem';

import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large");
    const [activeRow, setActiveRow] = useState(0);
    return (
        <Flex
            pos="sticky"
            left="0"
            h="95vh"
            marginTop="0vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.2)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                {/* <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                /> */}
                {/* <NavItem style={{border : "none"}} navSize={navSize} icon={FiHome} title="Dashboard" description="This is the description for the dashboard." active/>
                <Link to={"/user/info"}  style={{width : 180}}><NavItem navSize={navSize} icon={FiCalendar} title="Calendar"/></Link> */}
                <Link to={"/user/info"}  style={{width : 185}} onClick={() => {setActiveRow(1)}}>{ activeRow == 1 ? <NavItem navSize={navSize} icon={FiUser} title="Thông tin cá nhân" active/> : <NavItem navSize={navSize} icon={FiUser} title="Thông tin cá nhân" />}</Link>
                <Link to={"/user/password"}  style={{width : 180}} onClick={() => {setActiveRow(2)}}>{ activeRow == 2 ? <NavItem navSize={navSize} icon={IoLockClosedOutline} title="Đổi mật khẩu" active/> : <NavItem navSize={navSize} icon={IoLockClosedOutline} title="Đổi mật khẩu" />}</Link>
                <Link to={"/user/favourite"}  style={{width : 180}} onClick={() => {setActiveRow(3)}}>{activeRow == 3 ? <NavItem navSize={navSize} icon={IoHeartOutline} title="Ưa thích" active /> : <NavItem navSize={navSize} icon={IoHeartOutline} title="Ưa thích"/>}</Link>
                <Link to={"/user/transaction"}  style={{width : 180}} onClick={() => {setActiveRow(4)}}>{activeRow == 4 ? <NavItem navSize={navSize} icon={FiBriefcase} title="Đơn hàng" active /> :  <NavItem navSize={navSize} icon={FiBriefcase} title="Đơn hàng"/>}</Link>
                <Link to={"/user/delivery-address"}  style={{width : 180}} onClick={() => {setActiveRow(5)}}>{activeRow == 5 ? <NavItem navSize={navSize} icon={IoLocationOutline} title="Địa chỉ giao hàng" active /> : <NavItem navSize={navSize} icon={IoLocationOutline} title="Địa chỉ giao hàng"/>}</Link>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">Sylwia Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}