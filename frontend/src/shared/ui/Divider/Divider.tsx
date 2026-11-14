export enum Orientation {
    Horizontal,
    Vertical
}

export enum BorderStyle {
    Solid = 'solid',
    Dashed = 'dashed'
}

type DividerProps = {
    orientation: Orientation,
    borderStyle: BorderStyle,
    color?: string
    size?: string,
    thickness?: string,
}

export const Divider = ({ orientation, borderStyle, color='#80808033', size = '100%', thickness = '2px' }: DividerProps ) => {
    const styles: React.CSSProperties = {
        ...(orientation === Orientation.Horizontal
            ? {
                width: size,
                height: 0,
                borderBottom: `${thickness} ${borderStyle} ${color}`
            }
            : {
                width: 0,
                height: size,
                borderLeft: `${thickness} ${borderStyle} ${color}`
            }
        )
    }

    return (
        <div className='divider' style={styles}/>
    )
}