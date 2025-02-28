export default function Logo({ fontSize}) {
    return (
      <div style={{fontSize:fontSize,fontWeight:'bold'}} className={`text-green-800`}>
        EVVO <span className="text-green-900">Tech</span>
      </div>
    );
  }