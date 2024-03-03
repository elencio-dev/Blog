export type blogProps = {
    $updatedAt: string;
    id?: string,
    image: string,
    titulo: string,
    metadisc: string,
    Conteudo: string,
    slug?:string
  }
  
  export type PageParams = {
    slug: string;
  };


  export function formatDateString(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);
  
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  
    return `${formattedDate} at ${time}`;
  }

  export const multiFormatDateString = (timestamp: string = ""): string => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date: Date = new Date(timestampNum * 1000);
    const now: Date = new Date();
  
    const diff: number = now.getTime() - date.getTime();
    const diffInSeconds: number = diff / 1000;
    const diffInMinutes: number = diffInSeconds / 60;
    const diffInHours: number = diffInMinutes / 60;
    const diffInDays: number = diffInHours / 24;
  
    switch (true) {
      case Math.floor(diffInDays) >= 30:
        return formatDateString(timestamp);
      case Math.floor(diffInDays) === 1:
        return `${Math.floor(diffInDays)} dia atrás`;
      case Math.floor(diffInDays) > 1 && diffInDays < 30:
        return `${Math.floor(diffInDays)} dias atrás`;
      case Math.floor(diffInHours) >= 1:
        return `${Math.floor(diffInHours)} horas atrás`;
      case Math.floor(diffInMinutes) >= 1:
        return `${Math.floor(diffInMinutes)} minutos atrás`;
      default:
        return "Agora";
    }
  };