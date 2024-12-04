import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFile, faImage, faClipboard, faSun, faBell, faMoon } from '@fortawesome/free-regular-svg-icons';
import "../components/VerticalSidebar.scss";
import "../../horizontalNavBar/components/horizontalNavbar.scss";

import UserContext from '../../../GlobalContext/context';
import { faBars, faChevronRight, faChevronUp, faExpand, faGear, faHome, faMicrochip, faUserGroup, faWaveSquare, faWifi } from '@fortawesome/free-solid-svg-icons';
import { getSP } from '../loc/pnpjsConfig';
import { SPFI } from '@pnp/sp';
import classNames from 'classnames';
import "@pnp/sp/webs"; 
import "@pnp/sp/lists";
import "@pnp/sp/webs";  
interface NavItem {
  Title: string;
  Url: string;
  Icon: string;
  ParentId?: number;
  ID: number;
}

const VerticalContext = ({_context}:any) => {
  // console.log(_context);
  
  const sp: SPFI = getSP();
  // console.log(sp, 'sp');
  const imgLogo = require("../assets/logo-sm.png");
  const imgSMLogo = require("../assets/logosmlong.png");
  const useimg = require("../assets/useimg.png");

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [submenuOpen, setSubmenuOpen] = React.useState<number | null>(null);
  const [navItems, setNavItems] = React.useState<NavItem[]>([]);
  // const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const context = React.useContext(UserContext);
  const { setHide, useHide }: any = context;
  const {  toggleFullscreen }: any = React.useContext(UserContext);

  // const elementRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: any) => {
    if (!event.target.matches('.dropbtn')) {
      setIsOpen(false);
    }
  };

  const fetchNavItems = async () => {
    // try {
     await _context.web.lists.getByTitle("ARGSidebarNavigation").items.getAll().then((res:any)=>
      {
        // console.log(res,'res');
        const items: NavItem[] = res.map((item:any) => {
          return { 
            Title: item.Title,
            Url: item.Url,
            Icon: item.Icon,
            ParentId: item.ParentId,
            ID: item.ID
          };
        });
        setNavItems(res);
        console.log("nav items >>> " , items)
        return items;
   
  
        
      });
     
    // } catch (error) {
    //   console.error("Error fetching navigation items:", error);
    // }
  };

  React.useEffect(() => {
    fetchNavItems();

    const handleMouseEnter = () => {
      if (sidebar?.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
        setIsSidebarOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (sidebar?.classList.contains("hoverable")) {
        sidebar.classList.add("close");
        setIsSidebarOpen(false);
      }
    };

    const sidebar = document.querySelector(".sidebar");
    // const submenuItems = document.querySelectorAll(".submenu_item");

    sidebar?.addEventListener("mouseenter", handleMouseEnter);
    sidebar?.addEventListener("mouseleave", handleMouseLeave);

    if (window.innerWidth < 768) {
      sidebar?.classList.add("close");
    } else {
      sidebar?.classList.remove("close");
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    };
    window.addEventListener('click', closeDropdown);
    window.addEventListener('keydown', handleEscape);

    return () => {
      sidebar?.removeEventListener("mouseenter", handleMouseEnter);
      sidebar?.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  const handleSidebarToggle = (bol: boolean) => {
    setIsSidebarOpen((prevState: any) => !prevState);
    setHide(!bol);
    document.querySelector(".sidebar")?.classList.toggle("close");
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prevState: any) => !prevState);
    document.querySelector("body")?.classList.toggle("dark");
  };

  const handleSubmenuToggle = (index: number) => {
    // setSubmenuOpen((prevIndex: number) => (prevIndex === index ? index : index));
    setSubmenuOpen(prevIndex => (prevIndex === index ? null : index));
  };
  const renderNavItems = (items: NavItem[], parentId: number | null = null) => {
    // debugger
    return items
      .filter(item => item.ParentId === parentId)
      .map(item => (
        <li
          key={item.ID}
          className={classNames('item', { active: submenuOpen === item.ID && isSidebarOpen })}
        >
          <div
            className={classNames('nav_link submenu_item', {
              active: submenuOpen === item.ID && isSidebarOpen

            })}
            onClick={() => handleSubmenuToggle(item.ID)}
          >
            <span className="navlink_icon">
              <FontAwesomeIcon icon={getIcon(item.Icon)} />
            </span>
            {isSidebarOpen ? (
              <>
                <span className="navlink">{item.Title}</span>
                {items.some(subItem => subItem.ParentId === item.ID) && (
                  <FontAwesomeIcon
                    className="arrow-left"
                    icon={submenuOpen === item.ID ? faChevronUp : faChevronRight}
                  />
                )}
                {submenuOpen === item.ID && (
                  <ul className="menu_items nav_link submenu_item" style={{
                    background: '#fff', borderRadius: 'unset', display: 'block'
                  }}>
                    {renderNavItems(items, item.ID)}

                  </ul>
                )}
              </>
            ) : (

              <ul className="sub-menu blank navlinkcss" style={{ background: 'transparent', padding: 'unset', alignItems: 'start', boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)' }}>
                <div style={{ color: '#fff', textDecoration: 'none', background: '#1fb0e5', paddingLeft: '0.5rem', display: 'flex', height: '40px', alignItems: 'center' }}>
                  <li className='' style={{ background: '#1fb0e5', color: 'white' }}>
                    <a className="link_name" href="#" style={{ textDecoration: 'unset', color: 'white' }}> {item.Title}</a>
                  </li>
                </div>
                <div>
                  {items.filter(x => x.ParentId === item.ID).map(item => (
                    <li className='' style={{ paddingBottom: '0.5rem', paddingTop: '0.5rem' }} key={item.ID}>
                      <a className="link_name1" href={item.Url} style={{ textDecoration: 'none', paddingLeft: '0.5rem' }}>
                        {item.Title}
                      </a>
                    </li>
                  ))}
                </div>
              </ul>
            )}
          </div>
        </li>
      ));
  };
  // const renderNavItems = (items: NavItem[], parentId: number | null = null) => {
  //   return items
  //     .filter(item => item.ParentId === parentId)
  //     .map(item => (
  //       <li key={item.ID} className="item">
  //         <div  className={classNames('nav_link submenu_item', { active: isSidebarOpen })} onClick={() => handleSubmenuToggle(item.ID)}>
  //           <span className="navlink_icon">
  //             <FontAwesomeIcon icon={getIcon(item.Icon)} />
  //           </span>
  //           {isSidebarOpen ? (
  //             <>
  //               <span className="navlink ">{item.Title}</span>
  //               {items.some(subItem => subItem.ParentId === item.ID) && (
  //                 <FontAwesomeIcon className="arrow-left" icon={submenuOpen === item.ID ? faChevronUp : faChevronRight} style={{top:'0.8rem'}}/>
  //               )}
  //               {submenuOpen === item.ID && (
  //                 <ul className="menu_items submenu">
  //                   {renderNavItems(items, item.ID)}
  //                 </ul>
  //               )}
  //             </>
  //           ) : (
  //             <ul className="sub-menu blank navlinkcss">
  //               <li>
  //                 <a className="link_name" href={item.Url} style={{ color: '#fff', textDecoration: 'none' }}>
  //                   {item.Title}
  //                 </a>
  //               </li>
  //               {renderNavItems(items, item.ID)}
  //             </ul>
  //           )}
  //         </div>
  //       </li>
  //     ));
  // };


  // const renderNavItems = (items: NavItem[], parentId: number | null = null) => {
  //   return items.filter(item => item.ParentId === parentId).map(item => (
  //     <li key={item.ID} className="item">
  //       <div className="nav_link submenu_item" onClick={() => handleSubmenuToggle(item.ID)}>
  //         <span className="navlink_icon">
  //           <FontAwesomeIcon icon={getIcon(item.Icon)} />
  //         </span>
  //         {isSidebarOpen ?
  //           <>
  //             <span className="navlink">{item.Title}</span>
  //             {items.some(subItem => subItem.ParentId === item.ID) && (
  //               <FontAwesomeIcon className="arrow-left" icon={submenuOpen === item.ID ? faChevronUp : faChevronRight} />
  //             )}
  //             {submenuOpen === item.ID && (
  //               <ul className="menu_items submenu">
  //                 {renderNavItems(items, item.ID)}
  //               </ul>
  //             )}
  //           </>
  //           : <ul className="sub-menu blank navlinkcss">
  //             <li><a className="link_name" href={item.Url} style={{ color: '#fff', textDecoration: 'none' }}>{item.Title}</a></li>
  //             {renderNavItems(items, item.ID)}
  //           </ul>}
  //       </div>
  //     </li>
  //   ));
  // };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      home: faHome,
      calendar: faCalendar,
      file: faFile,
      image: faImage,
      clipboard: faClipboard,
      bell: faBell,
      userGroup: faUserGroup,
      wifi: faWifi,
      waveSquare: faWaveSquare,
      sun: faSun,
      moon: faMoon,
      approval: faWaveSquare,
      gear: faMicrochip
    };
    return iconMap[iconName] || "";
  };

  return (
    <>
       <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <li className="item pt-2">
              <div className="logo_item">
                <span>
                  <img src={isSidebarOpen ? imgSMLogo : imgLogo} alt="Logo" style={{ objectFit: 'cover', width: '100%' }} />
                </span>
              </div>
            </li>
            {renderNavItems(navItems)}
          </ul>
        </div>
      </nav>
      <nav className="navbar container-fluid">
        <div className="logo_item">
          <div className={`bottom_content ${useHide ? 'sidebar-closedBar' : 'sidebar-openBa'}`}>
            <div className="bottom expand_sidebar" onClick={() => handleSidebarToggle(useHide)}>
              <FontAwesomeIcon className={`bx bx`} icon={faBars} size='xs' />
            </div>
          </div>
        </div>

        <div className="navbar_content">
          <div className="search_bar">
            <input type="text" placeholder="Search.." className='searchcss' />
          </div>
          <FontAwesomeIcon className='bx bx-bell' icon={faExpand} onClick={toggleFullscreen} size='lg' />
          <FontAwesomeIcon className='bx bx-bell' icon={faBell} style={{ fontSize: '22px !important' }} />
          <FontAwesomeIcon className={isDarkMode ? 'bx bx-moon' : 'bx bx-sun'} onClick={handleThemeToggle} icon={isDarkMode ? faMoon : faSun} size='lg' />
          <div className="dropdown">
            <img src={useimg} alt="Profile" className="profile dropbtn" onClick={toggleDropdown} />
            <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
          <FontAwesomeIcon className='bx bx-user' icon={faGear} size='lg' />
        </div>
      </nav>
   
    </>
  );
};


const VerticalSideBar = ({_context}:any) => {
  return (
    // <UserContext.Provider value={{ setHide: () => { }, useHide: true }}>
    <VerticalContext _context={_context}/>
    // </UserContext.Provider>
  );
};
export default VerticalSideBar;