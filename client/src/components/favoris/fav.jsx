import "./fav.css";

function Favoris() {
  return (
    <div className="ensemble">
      {/* Titre principal de la page des favoris */}
      <h2 className="favorisé">❤️ Vos Menus Favoris</h2>
      
      <div className="favor">
        {/* Liste des menus favoris */}
        <ul className="listMenus">
          {/* Élément de la liste pour le menu européen */}
          <li className="menuList">
            <h2 className="menus-titles1">Europe</h2>
            <p className="détail">Menu Italien</p>
          </li>

          {/* Élément de la liste pour le menu africain */}
          <li className="menuList">
            <h2 className="menus-titles2">Afrique</h2>
            <p className="détail">Menu Sénégalais</p>
          </li>

          {/* Élément de la liste pour le menu américain */}
          <li className="menuList">
            <h2 className="menus-titles3">Amérique</h2>
            <p className="détail">Menu Mexicain</p>
          </li>

          {/* Élément de la liste pour le menu asiatique */}
          <li className="menuList">
            <h2 className="menus-titles4">Asie</h2>
            <p className="détail">Menu Coréen</p>
          </li>

          {/* Élément de la liste pour le menu océanien */}
          <li className="menuList">
            <h2 className="menus-titles5">Océanie</h2>
            <p className="détail">Menu Calédonien</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Favoris;
