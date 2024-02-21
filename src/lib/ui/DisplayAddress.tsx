export function useDisplayAddress(address?: `0x${string}` | string | null) {
  const start = address?.slice(2,2+5+1);
  const end = address?.slice(address?.length-5,address.length);
  return `0x${start}...${end}`
}

export function DisplayAddress({address}: {address?: `0x${string}` | string | null} ) {
  const display = useDisplayAddress(address);

  return <p className="prose-invert dark:prose">{display}</p>
}