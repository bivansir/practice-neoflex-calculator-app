type InfoSectionMenuProps = {
  activeId: string;
  setActiveId: (id: string) => void;
};

export const InfoSectionMenu = ({ activeId, setActiveId }: InfoSectionMenuProps) => {

    const menuElements = [
    { id: 1, label: 'About card'},
    { id: 2, label: 'Rates and conditions'},
    { id: 3, label: 'Cashback'},
    { id: 4, label: 'FAQ'}
  ];
  
    return(
        <div className="info-section-menu">
            <ul className="info-section-menu__list">
                {menuElements.map(element => (
                    <li key={element.id} className='info-section-menu__item'>
                        <button className={
                            `info-section-menu__button${activeId === element.label ? ' info-section-menu__button--active' : ''}`
                        }
                         onClick={() => setActiveId(element.label)}>
                            {element.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}