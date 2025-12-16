import Link from 'next/link';

export default function Home() {
  const tools = [
    {
      category: 'Crypto',
      items: [
        { name: 'Token Generator', path: '/crypto/token', desc: 'Geneate secure random authentication tokens.' },
        { name: 'UUID Generator', path: '/crypto/uuid', desc: 'Generate version 4 UUIDs.' }
      ]
    },
    {
      category: 'Converters',
      items: [
        { name: 'Roman to Number', path: '/converters/roman', desc: 'Convert Roman numerals to integers.' },
        { name: 'Text to Base64', path: '/converters/base64', desc: 'Encode and decode Base64 text.' }
      ]
    },
    {
      category: 'Text',
      items: [
        { name: 'Lorem Ipsum', path: '/text/lorem', desc: 'Generate Lorem Ipsum placeholder text.' },
        { name: 'Text Diff', path: '/text/diff', desc: 'Compare two text blocks for differences.' }
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem 0' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Developer Toolkit</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
          A collection of essential utilities for developers.
        </p>
      </header>

      <div style={{ display: 'grid', gap: '3rem' }}>
        {tools.map((group) => (
          <section key={group.category}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              color: 'var(--primary)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '0.5rem'
            }}>
              {group.category}
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {group.items.map((tool) => (
                <Link key={tool.path} href={tool.path} style={{ display: 'block' }}>
                  <div className="card" style={{ height: '100%' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {tool.name}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.5' }}>
                      {tool.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
