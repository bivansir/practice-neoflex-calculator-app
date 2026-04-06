type InfoSectionMenuProps = {
  activeId: number;
  setActiveId: (id: number) => void;
};

const menuElements = [
    { id: 1, label: 'About card'},
    { id: 2, label: 'Rates and conditions'},
    { id: 3, label: 'Cashback'},
    { id: 4, label: 'FAQ'}
];

export const InfoSectionMenu = ({ activeId, setActiveId }: InfoSectionMenuProps) => {  
    return(
        <div className="info-section-menu">
            <ul className="info-section-menu__list">
                {menuElements.map(element => (
                    <li key={element.id} className='info-section-menu__item'>
                        <button className={
                            `info-section-menu__button${activeId === element.id ? ' info-section-menu__button--active' : ''} text text--spaced`
                        }
                         onClick={() => setActiveId(element.id)}>
                            {element.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}