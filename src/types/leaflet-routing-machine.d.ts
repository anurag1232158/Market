import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    interface RoutingControlOptions {
      waypoints: L.LatLng[];
      lineOptions?: L.PolylineOptions & { styles?: any[] };
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoute?: boolean;
      showAlternatives?: boolean;
    }

    class Control extends L.Control {
      constructor(options?: RoutingControlOptions);
      getPlan(): any;
      on(event: string, fn: (...args: any[]) => void): this;
    }

    function control(options?: RoutingControlOptions): Control;
  }
}

declare module "leaflet-routing-machine" {
  const Routing: typeof L.Routing;
  export default Routing;
}
