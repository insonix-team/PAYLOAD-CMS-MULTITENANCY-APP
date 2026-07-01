const Logo = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      width: '100%',
      boxSizing: 'border-box',
      overflow: 'visible',
    }}
  >
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 62,
        minWidth: 62,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#fff',
        color: '#2563eb',
        fontWeight: 700,
        fontSize: 13,
        fontFamily: 'system-ui',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      INSONIX
    </span>
    <span
      style={{
        fontSize: 15,
        fontWeight: 700,
        color: 'var(--theme-elevation-900)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: 'system-ui',
        lineHeight: 1,
      }}
    >
      CMS
    </span>
  </div>
);

export default Logo;
