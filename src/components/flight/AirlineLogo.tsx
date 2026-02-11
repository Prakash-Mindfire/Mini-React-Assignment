type Props = {
    iata: string;
    name: string;
};

export default function AirlineLogo({ iata, name }: Props) {
    const logoUrl = `https://content.airhex.com/content/logos/airlines_${iata}_100_100_s.png`;

    return (
        <img
        className="airline-logo"
            src={logoUrl}
            alt={name}
            onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/80?text=Airline";
            }}
        />
    );
}
