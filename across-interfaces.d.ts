
export function across<A>(fn:()=>{new():A}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B>(fn:(f:new()=>B)=>{new():A},b:{new():B}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C>(fn:(f:new()=>B&C)=>{new():A},b:{new():B},c:{new():C}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D>(fn:(f:new()=>B&C&D)=>{new():A},b:{new():B},c:{new():C},d:{new():D}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E>(fn:(f:new()=>B&C&D&E)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F>(fn:(f:new()=>B&C&D&E&F)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G>(fn:(f:new()=>B&C&D&E&F&G)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G,H>(fn:(f:new()=>B&C&D&E&F&G&H)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G},h:{new():H}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G,H,I>(fn:(f:new()=>B&C&D&E&F&G&H&I)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G},h:{new():H},i:{new():I}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G,H,I,J>(fn:(f:new()=>B&C&D&E&F&G&H&I&J)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G},h:{new():H},i:{new():I},j:{new():J}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G,H,I,J,K>(fn:(f:new()=>B&C&D&E&F&G&H&I&J&K)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G},h:{new():H},i:{new():I},j:{new():J},k:{new():K}):<T>(t:{new():T})=>new()=>A&T
export function across<A,B,C,D,E,F,G,H,I,J,K,L>(fn:(f:new()=>B&C&D&E&F&G&H&I&J&K&L)=>{new():A},b:{new():B},c:{new():C},d:{new():D},e:{new():E},f:{new():F},g:{new():G},h:{new():H},i:{new():I},j:{new():J},k:{new():K},l:{new():L}):<T>(t:{new():T})=>new()=>A&T

export function override<A,B>(override: A, previous: {new():B}): {new(): Omit<B, keyof A> & A}

export function I<F extends (...args) => any>(f: F): ReturnType<F>
