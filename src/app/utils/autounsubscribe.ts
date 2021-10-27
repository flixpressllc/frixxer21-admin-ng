export function AutoUnsubscribe(blackList = []): (constructor: any) => void {
  return (constructor) => {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = () => {
      for (const prop in this) {
        if (!blackList.includes(prop)) {
          const property = this[prop];
          if (property && typeof property.unsubscribe === 'function') {
            property.unsubscribe();
          }
        }
      }
      if (original && typeof original === 'function') {
        original.apply(this, arguments);
      }
    };
  };
}
